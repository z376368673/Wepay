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
import BaseUrl from '../../util/BaseUrl';
import DialogUtils from '../../util/DialogUtils';
import HttpUtils from '../../util/HttpUtils';
import CountDownView from '../../common/CountDownView';

/**
 * 注册页面
 */
export default class RegisterPage extends BaseComponent {
    constructor(props) {
        super(props);
        //const {type} = this.props.navigation.state.params
        this.state = {
            nickName: "",
            phone: '18629448593',
            code: "",//当前验证码
            sms: "10086",//短信验证码
            pwd: "",//第一次密码
            pwdAgain: "",//第二次密码
            recommendPhone: "",//推荐人手机号
            paymentPwd: "", //支付密码
        }
    }
    /**
     * 注册
     */
    sumbit() {
        this.url = BaseUrl.getRegisterUrl()
        DialogUtils.showLoading();
        HttpUtils.postData(this.url,
            {
                mobile: this.state.phone,
                username: this.state.nickName,
                referrer: this.state.recommendPhone,
                loginPwd: this.state.pwdAgain,
                safetyPwd: this.state.paymentPwd,
            })
            .then(result => {
                if (result.code === 1) {
                    DialogUtils.showToast("注册成功")
                    this.props.navigation.goBack()
                } else {
                    DialogUtils.showToast(result.msg)
                }
                DialogUtils.hideLoading()
            })
            .catch(error => {
                DialogUtils.hideLoading()
                DialogUtils.showToast("注册失败")
            })
    }


    onClicks(type) {
        switch (type) {
            case 1://确定
                if (this.state.nickName.length < 1) {
                    DialogUtils.showMsg("请输入昵称")
                } else if (this.state.phone.length !== 11) {
                    DialogUtils.showMsg("请输入11位手机号")
                } else if (this.state.code!==this.state.sms) {
                    DialogUtils.showMsg("验证码不正确")
                } else if (this.state.pwd.length  < 6) {
                    DialogUtils.showMsg("请输入6位以上的密码")
                } else if (this.state.pwd !== this.state.pwdAgain) {
                    DialogUtils.showMsg("两次输入的密码不一致")
                } else if (this.state.recommendPhone.length  !== 11) {
                    DialogUtils.showMsg("请输入11位推荐人手机号")
                } else if (this.state.paymentPwd.length  !== 6) {
                    DialogUtils.showMsg("请输入6位交易密码")
                } else {
                    this.sumbit()
                }
                // this.props.navigation.navigate('ModifyNickName', {
                //     userName: this.state.nickname,
                //     callbacks: (name) => {
                //         this.getCallBackValue(name)
                //     }
                // });
                break
        }
        //this.props.navigation.goBack()
        //this.navigation.state.params.callbacks({nickname: this.state.text})
    }


    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: mainColor }]}>
                <NavigationBar
                    title={"Wepay用户注册"}
                    navigation={this.props.navigation}
                />

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入您的昵称'}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.setState({ nickName: text })} />
                </View>
                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入手机号码'}
                        defaultValue={this.state.phone}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.setState({ phone: text })} />
                </View>

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入验证码'}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.setState({ code: text })} />
                    <CountDownView codeText={"获取验证码"}
                        phone={this.state.phone}
                        callBack={(code) => this.setState({ sms: code })}
                        textStyle={{ marginRight: -15, padding: 10 }}
                    />
                </View>

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入密码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        keyboardType={"default"}
                        onChangeText={(text) => this.setState({ pwd: text })} />
                </View>

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'再次输入密码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        keyboardType={"default"}
                        onChangeText={(text) => this.setState({ pwdAgain: text })} />
                </View>
                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入推荐人手机号码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.setState({ recommendPhone: text })} />
                </View>
                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入交易密码（纯数字）'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={"numeric"}
                        onChangeText={(text) => this.setState({ paymentPwd: text })} />
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
                    onPress={() => this.onClicks(1)}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}>注 册</Text>
                </TouchableOpacity>
            </View>
        );
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
        height: 50,
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