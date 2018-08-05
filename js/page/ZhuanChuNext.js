import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import BaseUrl from '../util/BaseUrl';
import DialogUtils from '../util/DialogUtils';
import HttpUtils from '../util/HttpUtils';
import PassWordInput from '../common/PassNumInput';

//转出 下一步
export default class ZhuanChuNext extends BaseComponent {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation
        this.state = {
            mobile: '',//收入方手机号
            userid: '',//收入方id
            username: '',//收入方name
            imgHead: require("../../res/images/touxiang-xiao.png"),//收入方头像

            tranMoney:0.00,//转出金额
            mobile4:"",//手机号后四位
        }
        this.userInfo = this.getUserInfo();
        //接受上个界面传来的账户 （手机号）
        this.account =  this.navigation.state.params?this.navigation.state.params.account:"18629448593";
       // alert(this.account)
    }

    componentDidMount(){
        this.getOtherUserInfo();
    }

    /**
     * 获取用户想你想
     */
     getOtherUserInfo(){
        DialogUtils.showLoading()
        let url =  BaseUrl.getUserBy(this.userInfo.sessionId,this.account)
        HttpUtils.getData(url)
        .then(result => {
            if (result.code===1) {
                //alert(JSON.stringify(result))
                this.info = result.data
                this.setState({
                    mobile: this.info.mobile,
                    userid: this.info.userid,
                    username: this.info.username,
                    imgHead: {uri:this.getImgUrl(this.info.imgHead)},
                })
            }else{
                DialogUtils.showToast(result.msg)
                this.props.navigation.goBack()
            }
            DialogUtils.hideLoading()
        })
    }


    /**
     * 确认转出
     */
    tranOutMoney(safetyPwd){
        DialogUtils.showLoading()
        let url =  BaseUrl.tranOutMoney()
        HttpUtils.postData(url,{
            sessionId: this.userInfo.sessionId,
            payId: this.userInfo.userid,
            getId: this.state.userid,
            getNums: this.state.tranMoney,
            mobile: this.state.mobile4,
            safetyPwd: safetyPwd,
        })
        .then(result => {
            if (result.code===1) {
               DialogUtils.showMsg("转出成功")
            }else{
               DialogUtils.showToast(result.msg)
            }
            DialogUtils.hideLoading()
        })
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='转出'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('转出记录', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.onClicks(1))}
                />

                {/* 余额积分布局*/}
                <View style={[ {
                    flexDirection:'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 10,
                    backgroundColor:mainColor
                }]}>
                    <Image source={this.state.imgHead}
                    style={{width:60,height:60,borderRadius:30,borderWidth: 2,borderColor: "#fff",marginTop:25}}/>
                    <TouchableOpacity
                        activeOpacity={0.8}
                    >
                        <View style={{flexDirection: 'row',marginBottom:15,marginTop:10}}>
                            <Text style={{fontSize: 13, color: '#fff'}}>{this.state.username} </Text>
                            <Text style={{fontSize: 13, color: '#fff'}}>({this.state.userid})</Text>
                        </View></TouchableOpacity>
                </View>
                <Text style={[{
                    padding: 10,
                    backgroundColor: "#fff",
                    fontSize:14,
                    color:"#d11",
                }]}>转出金额</Text>
                <View style={{backgroundColor:"#f0f0f0",height:2,}}/>
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: "#fff",
                }]}>
                    <Text style={{
                        color: '#333',
                        fontSize: 15,
                        width:80,
                    }}>CNY(￥)</Text>
                    <TextInput
                        style={{height: 40,flex:1,fontSize: 22,color:'#d11',marginLeft:8}}
                        placeholder ={'0'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({tranMoney:text})}
                        //失去焦点时
                        onBlur={()=>this.onClicks(4)}
                    />
                </View>
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    marginTop:10,
                    backgroundColor: "#fff",
                }]}>
                    <Text style={{
                        color: '#333',
                        fontSize: 15,
                        width:80,
                    }}> 手机末4位</Text>
                    <TextInput
                        style={{height: 40,flex:1,fontSize: 15,color:'#333',marginLeft:8}}
                        placeholder ={'请输入对方手机号末4位数字'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({mobile4:text})}
                        //失去焦点时
                        onBlur={()=>this.onClicks(4)}
                    />
                </View>        
                {/* <Text style={[{
                    color:"#666",
                    padding: 15,
                    fontSize:16,
                }]}>提示:最少兑换数量100，请输入100的整数倍</Text> */}

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
                    onPress={()=>this.onClicks(5)}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}> 确定转出</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onClicks(index) {
        switch (index) {
            case 1: //转出记录
            this.props.navigation.navigate('TranMoneyRecord', {
                tranType: "out",
            });
                break;
            case 5:
            if(this.state.tranMoney<=0){
                DialogUtils.showMsg("请输入大于0的数字")
            } if(this.state.mobile4.length<1){
                DialogUtils.showMsg("请输入对方手机后四位数字")
            }else if(this.state.mobile4!==this.state.mobile.substr(7, 10)){
                DialogUtils.showMsg("手机后四位数字不正确")
            }else{
                PassWordInput.showPassWordInput((safetyPwd)=>{
                   this.tranOutMoney(safetyPwd)
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