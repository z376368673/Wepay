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
import QRCode from "react-native-qrcode";
import ExcIntegral from "../ExcIntegral";
import DialogUtils from '../../util/DialogUtils';
import Utils from '../../util/Utils';
import BaseUrl from '../../util/BaseUrl';
import HttpUtils from '../../util/HttpUtils';
import PassWordInput from '../../common/PassNumInput';

//W宝  转出 转入  锁定
export default class TranWB extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            account: "", //数量
            wepayNum: "0.00",//资产
        }
        this.userInfo = this.getUserInfo()
        this.type = this.props.navigation.state.params.type // 1转出 2转入  3锁定
    }

    render() {
        let title
        let name
        if(this.type===1){
            title = "W宝转出"
            name = "转出"
        }else if(this.type===2){
            title = "W宝转入"
            name = "转入"
        } else{
            title = "W宝锁定资产"
            name = "锁定"
        }
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title={title}
                    navigation={this.props.navigation}
                />
                <View style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: "#fff", marginTop: 8 }]}>
                    <Text style={{color: '#666', fontSize: 14, }}>当前{this.type===2?"wepay资产":"W宝可用资产"}:</Text>
                    <TextInput
                        style={{ height: 40, flex: 1, fontSize: 15, color: '#333', marginLeft: 8 }}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        editable={false}
                        value={this.state.wepayNum + ""}
                        onChangeText={(text) => {
                            //保留四位小数
                            var newText = Utils.formatNumBer(text,4)
                            this.setState({ wepayNum: newText })
                        }}
                    />
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: "#fff", marginTop: 1 }]}>
                    <Text style={{color: '#333', fontSize: 14, width: 80,}}>{name}数量</Text>
                    <TextInput
                        style={{ height: 40, flex: 1, fontSize: 14, color: '#333', marginLeft: 8 }}
                        placeholder={'可输入最多四位小数'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        value={this.state.account + ""}
                        onChangeText={(text) => {
                            var newText = Utils.formatNumBer(text,4)
                            this.setState({ account: newText })
                        }}
                    />
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
                        backgroundColor: mainColor,
                    }}
                    onPress={() => this.onClicks(2)}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 16,
                    }}> 确定</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //描述: 用于输入交易密码显示对方用户名
    getUserName(transferAddress, wepayNum) {
        DialogUtils.showLoading("");
        let url = BaseUrl.getUserName(transferAddress)
        HttpUtils.getData(url)
            .then(result => {
                DialogUtils.hideLoading()
                if (result.code === 1) {
                    PassWordInput.showPassWordInput((safetyPwd) => {
                        this.payTransfer(transferAddress, safetyPwd)
                    }, result.data, wepayNum)
                } else {
                    DialogUtils.showToast(result.msg)
                }

            })
    }
    //支付转出
    payTransfer(transferAddress, safetyPwd) {
        this.url = BaseUrl.transfer()
        DialogUtils.showLoading();
        HttpUtils.postData(this.url,
            {
                sessionId: this.userInfo.sessionId,
                transferNum: this.state.wepayNum,
                transferAddress: transferAddress,
                safetyPwd: safetyPwd
            })
            .then(result => {
                if (result.code === 1) {
                    DialogUtils.showToast("转出成功")
                    this.props.navigation.goBack()
                } else {
                    DialogUtils.showToast(result.msg)
                }
                DialogUtils.hideLoading()
            })
    }


    onClicks(index) {
        switch (index) {
            case "outRecord":
                this.props.navigation.navigate('TransactionRecord');
                break;
            case 2:
                if (this.state.wepayNum.length < 1) {
                    DialogUtils.showToast("请输入转出数量")
                }  else if (!Utils.regPrice(this.state.wepayNum)) {
                    DialogUtils.showMsg("最多输入2位小数"+this.state.wepayNum)
                } else if (this.state.account.length < 1) {
                    DialogUtils.showToast("请输入账号/UID")
                } else {
                    this.getUserName(this.state.account, this.state.wepayNum)
                }
                break;
            default:
                break;
        }
    }
}
export const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position:"absolute",  //绝对布局
    },
});