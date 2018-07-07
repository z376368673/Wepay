import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from '../../util/HttpUtils';
import BaseUrl from '../../util/BaseUrl';
import DialogUtils from '../../util/DialogUtils';
import AsySorUtils from "../../dao/AsySorUtils"
/**
 * 登陆页面
 */
export default class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '13923044417',
            pwd:'1424024195',
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: mainColor }]}>
                <NavigationBar
                    title={"Wepay用户登陆"}
                    navigation={this.props.navigation}
                />
                <View style={styles.itemView}>
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
                <View style={{ flexDirection: "row-reverse", }}>
                    <TouchableOpacity onPress={() => this.onClicks(0)} style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 15,
                            color: "#d15",
                            marginRight: 20
                        }}>注 册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClicks(1)} style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 15,
                            color: "#d15",
                            marginRight: 20
                        }}>忘记密码</Text>
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
            this.props.navigation.navigate('ForgetPassWord',{
                type:0
            })
                break
            case 2://登陆
                this.loginByPwd();
                break
        }
    }
    /**
     * 登陆
     */
    loginByPwd(){
        DialogUtils.showLoading("");
        HttpUtils.getData(BaseUrl.loginUrl(this.state.text,this.state.pwd))
        .then(result => {
            alert(JSON.stringify(result))
            if (result.code===1) {
                DialogUtils.showToast("登陆成功")
                this.props.navigation.navigate('SettingView');
                AsySorUtils.saveUser(result.data)
            }else{
                DialogUtils.showToast(result.msg)
            }
            DialogUtils.hideLoading()
        })
        .catch(error => {
            DialogUtils.hideLoading()
           DialogUtils.showToast("服务器繁忙")
           AsySorUtils.saveUser("result.data")
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
        backgroundColor: "#129481",
        borderRadius: 3,
        borderColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15,
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