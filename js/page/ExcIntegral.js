import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import QRCode from "react-native-qrcode";
import ViewUtils from "../util/ViewUtils";
import BaseUrl from '../util/BaseUrl';
import DialogUtils from '../util/DialogUtils';
import HttpUtils from '../util/HttpUtils';
import PassWordInput from '../common/PassNumInput';
//兑换积分
export default class ExcIntegral extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            exchangeMoney:0,
            yue: 0,
            jifen: 0,
        }
        //this.account =  this.navigation.state.params.account;
        this.userInfo = this.getUserInfo();
    }
    componentDidMount(){
        this.setState({
            yue:this.userInfo.cangkuNum,
            jifen:this.userInfo.fengmiNum,
        })
    }
     /**
     * 积分兑换
     */
    creditsExchange(safetyPwd){
        DialogUtils.showLoading()
        let url =  BaseUrl.creditsExchange()
        HttpUtils.postData(url,{
            sessionId: this.userInfo.sessionId,
            exchangeMoney: this.state.exchangeMoney,
            safetyPwd: safetyPwd,
        })
        .then(result => {
            if (result.code===1) {
               DialogUtils.showMsg("兑换成功")
            }else{
               DialogUtils.showToast(result.msg)
            }
            DialogUtils.hideLoading()
        })
        .catch(error => {
            DialogUtils.hideLoading()
            DialogUtils.showToast("服务器繁忙"+error.message)
        })
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='兑换积分'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('兑换记录', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.onClicks("record"))}
                />

                {/* 余额积分布局*/}
                <View style={[ {
                    flexDirection:'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 10,
                    paddingTop:30,
                    backgroundColor:mainColor
                }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                    >
                        <View style={{flexDirection: 'column',alignItems: "center" }}>
                            <Text style={{fontSize: 16, color: '#fff'}}>余额</Text>
                            <Text style={{fontSize: 16, color: '#fff'}}>￥{this.state.yue}</Text>
                        </View></TouchableOpacity>
                    <View style={{height: 30, width: 0.5, backgroundColor: '#fff'}}/>
                    <TouchableOpacity
                        activeOpacity={0.8}
                    >
                        <View style={{flexDirection: 'column',alignItems: "center" }}>
                            <Text style={{fontSize: 16, color: '#fff'}}>积分</Text>
                            <Text style={{fontSize: 16, color: '#fff'}}>￥{this.state.jifen}</Text>
                        </View></TouchableOpacity>
                </View>
                <Text style={[{
                    padding: 15,
                    backgroundColor: "#fff",
                    fontSize:16,
                    color:"#333",
                }]}>兑换成积分</Text>
                <View style={{backgroundColor:"#f0f0f0",height:2,}}/>
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: "#fff",
                }]}>
                    <Text style={{
                        color: '#333',
                        fontSize: 18,
                    }}> 余额      </Text>
                    <TextInput
                        style={{height: 40,flex:1,fontSize: 16,color:'#333',marginLeft:8}}
                        placeholder ={'请输入兑换金额'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({exchangeMoney:text})}
                        //失去焦点时
                        // onBlur={()=>this.onClicks(4)}
                    />
                </View>

                <Text style={[{
                    color:"#666",
                    padding: 15,
                    fontSize:16,
                }]}>提示:最少兑换数量100，请输入100的整数倍</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        height:45,
                        marginTop:40,
                        marginLeft:15,
                        marginRight:15,
                        borderRadius:8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:mainColor,
                    }}
                    onPress={()=>this.onClicks("sumbit")}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}> 确定兑换</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onClicks(index) {
        switch (index) {
            case "record": //兑换记录
                this.props.navigation.navigate('YueOrIntegralRecord', { type: 1 });
                break;
            case "sumbit"://确定兑换
            if(this.state.exchangeMoney<100||this.state.exchangeMoney%100!==0){
                DialogUtils.showMsg("请输入大于等于100的整数倍")
            }else{
                PassWordInput.showPassWordInput((safetyPwd)=>{
                    this.creditsExchange(safetyPwd)
                 })
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