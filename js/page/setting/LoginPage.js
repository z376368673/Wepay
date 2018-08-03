import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from '../../util/HttpUtils';
import BaseUrl from '../../util/BaseUrl';
import DialogUtils from '../../util/DialogUtils';
import AsySorUtils from "../../dao/AsySorUtils"
import { inject, observer } from 'mobx-react';
import UserInfo from '../../model/UserInfo';
import ViewUtils from '../../util/ViewUtils';
import SplashScreen from "react-native-splash-screen"
/**
 * 登陆页面
 */
@inject('AppStore')
export default class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            // text: '26641',
             text: '26536', 
            // text: '18629448593',
            // text: '13923044417',
            //text: '15989426734',
            //pwd: 'huazhongno1',
            pwd: '123456',
        }
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: mainColor }]}>
                <NavigationBar
                    title={"Wepay用户登陆"}
                    navigation={this.props.navigation}
                />
                <View style={{height:150,justifyContent:"center",alignItems:"center"}}>
                <Image style={{height:100,width:100,resizeMode:"center",}} 
                       source={require('../../../res/images/logo-d.png')}/>
                </View>
                
                <View style={styles.itemView}>
                <Image style={{height:30,width:30,resizeMode:"center",marginRight:10}} 
                       source={require('../../../res/images/user.png')}/>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={"请输入手机号/账号"}
                        defaultValue={this.state.text ? this.state.text : undefined}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.setState({ text: text })} />
                </View>

                <View style={styles.itemView}>
                <Image style={{height:30,width:30,resizeMode:"center",marginRight:10}} 
                       source={require('../../../res/images/password.png')}/>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入密码'}
                        placeholderTextColor={'#fff'}
                        defaultValue={this.state.pwd ? this.state.pwd : undefined}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        keyboardType={"default"}
                        onChangeText={(pwd) => this.setState({ pwd: pwd })} />
                </View>
                <View style={{ flexDirection: "row", }}>
                    <TouchableOpacity onPress={() => this.onClicks(1)} style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 15,
                            color: "#f82929",
                            marginLeft:25,
                        }}>忘记密码</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onClicks(0)} style={{ flex: 1, height: 50, justifyContent:"center",alignItems:"flex-end" }}>
                        <Text style={{
                            fontSize: 15,
                            color: "#fff",
                            marginRight: 20
                        }}>注 册</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        height: 45,
                        marginTop: 40,
                        marginLeft: 15,
                        marginRight: 15,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#004B9f",
                    }}
                    onPress={() => this.onClicks(2)}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}>登 陆</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     *  点击事件 
     * @param {*} type 
     */
    onClicks(type) {
        switch (type) {
            case 0://注册
                this.props.navigation.navigate('RegisterPage', {
                    userName: this.state.nickname,
                });
                break
            case 1://忘记密码
                this.props.navigation.navigate('ForgetPassWord', {
                    type: 0
                })
                break
            case 2://登陆
                // this.props.navigation.navigate('HomePage');
                this.loginByPwd();
                break
        }
    }
    /**
     * 登陆
     */
    loginByPwd() {
        DialogUtils.showLoading("");
        let url = BaseUrl.loginUrl(this.state.text, this.state.pwd)
        HttpUtils.getData(url)
            .then(result => {
                if (result.code === 1) {
                    //alert(JSON.stringify(result))
                    //Mobx保存方式
                    this.props.AppStore.setUserInfo(result.data)
                    //全局保存，    
                    UserInfo.userInfo = result.data
                    this.props.navigation.navigate('HomePage');
                    DialogUtils.showToast("登陆成功")
                    //异步保存到本地文件  
                    // AsySorUtils.saveUser(result.data, () => {
                    //     UserInfo.userInfo = result.data
                    //     //alert("userInfo:"+JSON.stringify(UserInfo.userInfo))
                    //     
                    //     //this.props.navigation.navigate('SettingView');
                    //     DialogUtils.showToast("登陆成功")
                    // })
                } else {
                    DialogUtils.showToast(result.msg)
                }
                DialogUtils.hideLoading()
            })
            .catch(error => {
                DialogUtils.hideLoading()
                DialogUtils.showToast("服务器繁忙" + error.message)
            })
    }

}
export const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position:"absolute",  //绝对布局
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#469c92",
        borderRadius: 3,
        borderColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        borderWidth: 1,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    itemTextInput: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
    }
});