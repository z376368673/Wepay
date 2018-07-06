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
import BankCardModel from "../model/BankCardModel";
import ViewUtils from "../util/ViewUtils";
import RefreshFlatList from "../common/RefreshFlatList";
import HttpUtils from "../util/HttpUtils";
import CheckMoney from "../common/CheckMoney";
/**
 * 买入\卖出中心
 */

const URL = 'https://api.github.com/search/repositories?q=';
let urlKey = "java"
export default class BuyOrSellCentre extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            seleIndex: -1,//默认不选中
            selectedValue: 0,//默认值为0
            dataArray: []
        }
    }
    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }

    //加载更多数据
    _onLoadData() {
        setTimeout(() => {
            this.refList.addData([])
        }, 2000)
    }
    //刷新数据
    _refreshData() {
        this.refList.refreshStar()
        HttpUtils.getData(URL +urlKey)
            .then(result => {
                this.refList.setData(result.items)
                this.setState({
                    dataArray: result.items
                })
            })
            .catch(error => {
                this.refList.setData([])
            })
    }

    render() {
        const {navigation} = this.props;
        const type = navigation.state.params.type ? navigation.state.params.type : 0;
        let title = type===0?"买入中心":"卖出中心"
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title={title}
                    navigation={this.props.navigation}
                />
                <View style={[{flexDirection: 'column', backgroundColor: "#fff"}]}>
                    <Text style={{
                        color: '#999',
                        fontSize: 18,
                        paddingTop: 15,
                        paddingLeft: 15,
                        paddingBottom: 15,
                    }}> 点击选择匹配金额</Text>
                    {ViewUtils.getLineView()}
                    <CheckMoney
                        arrText={[500, 1000, 3000, 5000, 10000, 30000]}
                        onSelected={(index, value) => this.onSelected(index, value)}
                    />

                </View>
                <View style={{flex: 1, marginTop: 12,}}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        onRefreshs={() => {
                            this._refreshData()
                        }}
                        onLoadData={() => {
                            this._onLoadData()
                        }}
                        renderItem={(items) => this._getBuyOrSellItem(items)}/>
                </View>
            </View>
        );
    }
    _getBuyOrSellItem(items) {
        return <View style={{
            borderTopWidth:0.5,
            borderBottomWidth:0.5,
            borderColor: '#CCC',
            backgroundColor: '#fff',
            marginBottom: 8,
        }}>
            <TouchableOpacity onPress={() => {
                // alert('点击')
            }}>
                <View style={{flexDirection: 'column', padding: 10,}}>
                    <Text style={{color: "#333333", fontSize: 20,}}>{items.item ? items.item.name : "name"}</Text>
                    <Text style={{
                        color: "#666666",
                        marginTop: 5,
                        fontSize: 15,
                    }}>{items.item ? items.item.description : "description"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
    onClicks(type) {
        alert(type)
    }
    onSelected(index, value) {
        urlKey = value
        this._refreshData()
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