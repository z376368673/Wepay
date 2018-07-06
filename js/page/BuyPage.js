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
import BankCardModel from "../model/BankCardModel";
import CheckMoney from "../common/CheckMoney";
import YueOrIntegralRecord from "./YueOrIntegralRecord";
import BuyOrSellUnfinishedOrder from "./BuyOrSellUnfinishedOrder";


export default class BuyPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            seleIndex: -1,//默认不选中
            selectedValue: 0,//默认值为0
        }
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
                <BankCardView
                    BankCardModel={{
                        userName: '呵呵1',
                        bankName: '中国银行1',
                        bankNum: '1234567892'
                    }}
                />

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

    }

    onClicks(type) {
        alert(type)
    }

    _rightClick(view) {
        this.show(view, 'end')
    }

    _menuClick(index) {
        switch (index) {
            case 1:
                this.props.navigation.navigate('BuyOrSellUnfinishedOrder', {type: 0});
                break;
                break;
            case 2:
                alert("确认打款")
                break;
            case 3:
                alert("已完成订单")
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