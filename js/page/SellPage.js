import React from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import { Menu } from 'teaset';
import BankCardView from "../common/BankCardView";
import BankCardModel from "../model/BankCardModel";
import ViewUtils from "../util/ViewUtils";
import CheckMoney from "../common/CheckMoney";
import BaseUrl from '../util/BaseUrl';
import DialogUtils from '../util/DialogUtils';
import HttpUtils from '../util/HttpUtils';


export default class SellPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            seleIndex: -1,//默认不选中
            selectedValue: 0,//选中金额 默认值为0 

            bankCardID:"",
            bankCardName:"",
            bankCardNum:"",
            userName:"请选择银行卡",

            safetyPwd:"",

            text:"",//描述
        }
        this.userInfo = this.getUserInfo();
    }
    /**
     * 选择银行卡
     */
    selectBankCard(){
        this.props.navigation.navigate("BankCardList",{
            selectBank:(bankCard)=>{
                this.setState({
                    bankCardID:bankCard.cardId,
                    bankCardName:bankCard.banqGenre,
                    bankCardNum:bankCard.cardNumber,
                    userName:bankCard.holdName,
                })
            }
        })
    }

    /**
     * 创建订单
     */
   creatOrder() {
        DialogUtils.showLoading();
       this.url = BaseUrl.createOutOrder()
       HttpUtils.postData(this.url,
           {
                sessionId:this.userInfo.sessionId,
                exchangeMoney: this.state.selectedValue,
                describe: this.state.text,
                bankId: this.state.bankCardID,
                safetyPwd: this.state.safetyPwd,
           })
           .then(result => {
               if (result.code === 1) {
                   DialogUtils.showMsg("创建订单成功")
                   //this.props.navigation.goBack()
               } else {
                   DialogUtils.showToast(result.msg)
               }
               DialogUtils.hideLoading()
           })
           .catch(error => {
               DialogUtils.hideLoading()
               DialogUtils.showToast("创建订单失败")
           })
   }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='卖出'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_More((view) => this._rightClick(view))}
                />
                <ScrollView>
                    <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                        {/*绑定银行卡*/}
                        <TouchableOpacity onPress={()=>this.selectBankCard()}>
                        <BankCardView
                            BankCardModel={{
                                userName: this.state.userName,
                                bankName: this.state.bankCardName,
                                bankNum: this.state.bankCardNum,
                            }}
                        /></TouchableOpacity>

                        <View style={[{ flexDirection: 'column', backgroundColor: "#fff", marginTop: 12, }]}>
                            <Text style={{
                                color: '#999',
                                fontSize: 18,
                                paddingTop: 15,
                                paddingLeft: 15,
                                paddingBottom: 15,
                            }}> 请选择买入金额</Text>
                            {ViewUtils.getLineView()}
                            <CheckMoney
                                arrText={[500, 1000, 3000, 5000, 10000, 30000]}
                                onSelected={(index, value) => this.onSelected(index, value)}
                            />
                        </View>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior='padding '>
                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    fontSize: 16,
                                    color: '#333',
                                    maxLength: 50,
                                    marginTop: 8,
                                    backgroundColor: "#fff"
                                }}
                                placeholder={'描述，(注意：请不要输入表情)'}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                onChangeText={(text) => this.setState({text:text})}
                            //失去焦点时
                            //onBlur={this.onClicks("onBlur")}
                            /></KeyboardAvoidingView>
                        <View style={{ height: 60 }} />
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{
                                height: 45,
                                marginLeft: 15,
                                marginRight: 15,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: mainColor,
                            }}
                            onPress={()=>this.onClicks("creatOrder")}
                        >
                            <Text style={{
                                alignSelf: "center",
                                color: '#FFF',
                                fontSize: 20,
                            }}> 创建订单</Text>
                        </TouchableOpacity>
                    </View></ScrollView>
            </View>
        );
    }

    onClicks(type) {
        switch(type){
            case "creatOrder":
            this.creatOrder();
            break;
        }
    }

    _rightClick(view) {
        this.show(view, 'end')
    }
    onSelected(index, value) {

    }
    _menuClick(index) {
        switch (index) {
            case 1:
                this.props.navigation.navigate('BuyOrSellUnfinishedOrder', { type: 1 });
                break;
            case 2:
                alert("确认打款")
                break;
            case 3:
                alert("已完成订单")
                break;
            case 4:
                this.props.navigation.navigate('BuyOrSellRecord', { type: 1 });
                break;
            case 5:
                this.props.navigation.navigate('BuyOrSellCentre', { type: 1 });
                break;
            default:
                break;
        }
    }

    /**
     *
     * @param view
     * @param align  'star' ,'end'
     */
    show(view, align) {
        if (view)
            view.measure((x, y, width, height, pageX, pageY) => {
                let itemStyle = { backgroundColor: mainColor, color: "#fff", fontSize: 16, borderColor: "#fff" }
                let activeOpacity = 0.9;
                let backgroundColor = "#fff";
                let items = [
                    { title: '未完成订单', onPress: () => this._menuClick(1), itemStyle: itemStyle },
                    { title: '确认打款', onPress: () => this._menuClick(2), itemStyle: itemStyle },
                    { title: '已完成订单', onPress: () => this._menuClick(3), itemStyle: itemStyle },
                    { title: '卖出记录', onPress: () => this._menuClick(4), itemStyle: itemStyle },
                    { title: '卖出中心', onPress: () => this._menuClick(5), itemStyle: itemStyle },
                ];
                Menu.show({ x: pageX, y: pageY, width, height }, items, { align, activeOpacity, backgroundColor });
            });
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