import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import { Menu } from 'teaset';
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
            dataArray: [],
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
        HttpUtils.getData(URL + urlKey)
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
        const { navigation } = this.props;
       this.type = navigation.state.params ? navigation.state.params.type : 1;
        let title = this.type === 0 ? "买入中心" : "卖出中心"
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title={title}
                    navigation={this.props.navigation}
                />
                <View style={[{ flexDirection: 'column', backgroundColor: "#fff" }]}>
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
                <View style={{ flex: 1, marginTop: 12, }}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        onRefreshs={() => {
                            this._refreshData()
                        }}
                        onLoadData={() => {
                            this._onLoadData()
                        }}
                        renderItem={(items) => this._getBuyOrSellItem(items)} />
                </View>
            </View>
        );
    }
    _getBuyOrSellItem(data) {
        return <View
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                marginBottom: 8,
                flexDirection: 'row',
                padding: 10
            }}>
            <Image
                style={{ width: 60, height: 60, borderWidth: 1, borderRadius: 30, borderColor: "#d11" }}
                source={require("../../res/images/banben.png")} />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, justifyContent: "center" }}>
                <Text
                    style={{ color: "#333333", fontSize: 18, }}>{data.item ? data.item.name : "name"}</Text>
                {/* 信用值  */}
                <View style={{ marginTop: 5, alignContent:"center"}}>
                {ViewUtils.getCreditView(data.index+1, 15, 14, "#888")}
                </View>
                {/*支付方式 */}
               {this.type===0?<Text style={{
                    color: "#888",
                    fontSize: 15,
                    marginTop: 5
                }}
                    numberOfLines={1}
                >支付方式:{data.item.name}</Text>:null} 
            </View>

            <View style={{ flexDirection: "column", backgroundColor: "#fff", marginTop: 5 }}>
                <Text style={{
                    color: "#444",
                    fontSize: 17,
                    alignSelf:"flex-end",
                }}
                    numberOfLines={1}
                >交易金额 {data.item.name} RMB</Text>
                <Text style={{
                    color: "#888",
                    fontSize: 14,
                    marginTop: 8,
                    alignSelf:"flex-end",
                }}
                    numberOfLines={1}
                >实付金额:{data.item.name} RMB</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#d11",
                        marginRight: 5,
                        borderRadius: 3,
                        borderColor: "#d11",
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                        width:60,
                        alignSelf:"flex-end",
                        height:30
                    }}
                    onPress={() => this.onClickDelect(data)}>
                    <Text style={{
                        fontSize: 14,
                        color: "#fff",
                        padding:5,
                    }}> 买入 </Text>
                </TouchableOpacity>
            </View>
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