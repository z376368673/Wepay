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

//Wepay 转出
export default class TranWepay extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            wepayNum:"",
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='转出'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('记录', {
                        fontSize: 16, color: "#fff"
                    }, () => this.onClicks("outRecord"))}
                />
                <View style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: "#fff", marginTop: 8 }]}>
                    <Text style={{
                        color: '#333',
                        fontSize: 18,
                        width:80,
                    }}>Wepay</Text>
                    <TextInput
                        style={{ height: 40, flex: 1, fontSize: 16, color: '#333', marginLeft: 8 }}
                        placeholder={'请输入转出数量(如有小数保留2位)'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        value={this.state.wepayNum + ""}
                        onChangeText={(text) => {
                            const newText = Utils.chkPrice(text)
                            this.setState({ wepayNum: newText })
                        }}
                        //失去焦点时
                        onBlur={() => this.onClicks(4)}
                    />
                </View>
                <View style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: "#fff", marginTop: 1 }]}>
                    <Text style={{
                        color: '#333',
                        fontSize: 18,
                        width:80,
                    }}>转出地址</Text>
                    <TextInput
                        style={{ height: 40, flex: 1, fontSize: 16, color: '#333', marginLeft: 8 }}
                        placeholder={'手机/UID/钱包地址'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            this.setState({ account: text })
                        }}
                        //失去焦点时
                        onBlur={() => this.onClicks(4)}
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
                        fontSize: 20,
                    }}> 确定</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onClicks(index) {
        switch (index) {
            case "outRecord":
                this.props.navigation.navigate('TransactionRecord');
                break;
            case 2:
                if (this.state.wepayNum.length <1) {
                    DialogUtils.showToast("请输入转出数量")
                }else if (this.state.account.length <1) {
                    DialogUtils.showToast("请输入账号/UID")
                } else {
                   
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