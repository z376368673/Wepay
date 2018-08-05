import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import {Menu} from 'teaset';
import BankCardView from "../common/BankCardView";
import ViewUtils from "../util/ViewUtils";
import CheckMoney from "../common/CheckMoney";
import BaseUrl from '../util/BaseUrl';
import DialogUtils from '../util/DialogUtils';
import HttpUtils from '../util/HttpUtils';
import PassWordInput from '../common/PassNumInput';


export default class BuyPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            seleIndex: -1,//默认不选中
            selectedValue: 0,//默认值为0

            bankCardID:"",
            bankCardName:"",
            bankCardNum:"",
            userName:"请选择银行卡",
            describe:"",//描述
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
                    bankCardID:bankCard.id,
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
   creatOrder(safetyPwd) {
    DialogUtils.showLoading();
    this.url = BaseUrl.createInOrder()
    HttpUtils.postData(this.url,
        {
             sessionId:this.userInfo.sessionId,
             exchangeMoney: this.state.selectedValue,
             describe: this.state.describe,
             bankId: this.state.bankCardID,
             safetyPwd: safetyPwd,
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
      
}


    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='买入'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_More((view) => this._rightClick(view))}
                />
                <View style={[{flexDirection: 'column', backgroundColor: "#fff"}]}>
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
                {/*绑定银行卡*/}
                <TouchableOpacity onPress={()=>this.selectBankCard()}>
                        <BankCardView
                            BankCardModel={{
                                userName: this.state.userName,
                                bankName: this.state.bankCardName,
                                bankNum: this.state.bankCardNum,
                            }}
                        /></TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
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
                    onPress={()=>this.onClicks("creatOrder")}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}> 创建订单</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onSelected(index, value) {
        this.state.seleIndex = index
        this.setState({
         seleIndex:index,
         selectedValue:value,
        })
    }

    onClicks(type) {
        switch(type){
            case "creatOrder":
            PassWordInput.showPassWordInput((safetyPwd)=>this.creatOrder(safetyPwd))
            break;
        }
    }

    _rightClick(view) {
        this.show(view, 'end')
    }

    _menuClick(index) {
        switch (index) {
            case 1:
                this.props.navigation.navigate('BuyOrSellUnfinishedOrder', {type: 0,orderType:1});
                break;
            case 2:
                this.props.navigation.navigate('BuyOrSellOrde', { type: 0 ,orderType:2});
                break;
            case 3:
            this.props.navigation.navigate('BuyOrSellOrde', { type: 0 ,orderType:3});
                break;
            case 4:
                this.props.navigation.navigate('BuyOrSellRecord', {type: 0});
                break;
            case 5:
                this.props.navigation.navigate('BuyOrSellCentre', {type: 0});
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
                let itemStyle = {backgroundColor: mainColor, color: "#fff", fontSize: 16, borderColor: "#fff"}
                let activeOpacity = 0.9;
                let backgroundColor = "#fff";
                let items = [
                    {title: '未完成订单', onPress: () => this._menuClick(1), itemStyle: itemStyle},
                    {title: '确认打款', onPress: () => this._menuClick(2), itemStyle: itemStyle},
                    {title: '已完成订单', onPress: () => this._menuClick(3), itemStyle: itemStyle},
                    {title: '买入记录', onPress: () => this._menuClick(4), itemStyle: itemStyle},
                    {title: '买入中心', onPress: () => this._menuClick(5), itemStyle: itemStyle},
                ];
                Menu.show({x: pageX, y: pageY, width, height}, items, {align, activeOpacity, backgroundColor});
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