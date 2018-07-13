import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../page/BaseComponent";
import HttpUtils from "../util/HttpUtils";
import RefreshFlatList from "./RefreshFlatList.js"
import Utils from '../util/Utils';

//订单公用类（相当于Fragment）
const window_w = Utils.getWidth();
export const KEYS =[""]
export default class OrderCommon extends BaseComponent {
    constructor(props) {
        super(props);
        this.tabLabel = this.props.tabLabel;
        this.key = this.props.key;
        this.numColumns = this.props.numColumns?this.props.numColumns:1
        this.state = {
            text: '18629448593',
        }
    }
    //界面加载完成
    componentDidMount() {
        this._refreshData()
        
    }
    //刷新数据
    _refreshData(value) {
        const URL = 'https://api.github.com/search/repositories?q=';
        this.refList.refreshStar()
        HttpUtils.getData(URL + value)
            .then(result => {
                var arr = [];
                for (let i = 0; i < 10; i++) {
                    arr.push(result.items[i])
                }
                this.refList.setData(arr)
            })
            .catch(error => {
                this.refList.setData([])
            })
    }

    onClickDelect(data) {

    }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <RefreshFlatList
                    ref={refList => this.refList = refList}
                    numColumns={ this.numColumns }
                    onRefreshs={() => this._refreshData()}
                    onLoadData={() => this._onLoadData()}
                    renderItem={(items) =>  this.numColumns===1?this._getStoreMall(items):this._getStore(items) } />
            </View>
        );
    }
    /**
     * 
     * @param {*} item 
     */
    goDetails(item) {
        this.props.navigation.navigate('StoreDetails', {
            item: item,
        });
    }

    //加载更多数据
    _onLoadData() {
        setTimeout(() => {
            this.refList.addData(this.state.dataArray)
        }, 2000)
    }
    /**
          * 绘制itemView
          * @param data
          * @returns {*}
          * @private
          */
    _getStore(data) {
        return <View
            key={this.state.activeIndex === 0 ? data.item.index : data.item.index + 1}
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                marginBottom: 4,
                flexDirection: "column",
                marginLeft: 2,
                marginRight: 2,
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{ width: window_w / 2 - 4, height: window_w / 2, }}
                onPress={(item) => this.goDetails(item)}>
                <Image
                    style={{ width: window_w / 2 - 4, height: window_w / 2, }}
                    source={require("../../res/images/default_shop.png")} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', padding: 5, height: 60, justifyContent: "center", alignContent: "center" }}>
                <Text style={{ color: "#333333", fontSize: 18, }} numberOfLines={1}>
                    {data.item ? data.item.name : "name"}</Text>

                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{
                        color: "#d11",
                        fontSize: 15,
                    }}>￥{124}</Text>
                    <Text style={{
                        color: "#888",
                        fontSize: 15,
                        marginLeft: 30,
                    }}>库存:{3}</Text>
                </View>
            </View>
        </View>
    }

    /**
          * 绘制itemView
          * @param data
          * @returns {*}
          * @private
          */
    _getStoreMall(data) {
        return <View
            key={data.item.index}
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
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, }}>
                <Text
                    style={{ color: "#333333", fontSize: 18 }}>{data.index} {data.item ? data.item.name : "name"}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{
                        color: "#888",
                        fontSize: 15,
                        flex: 1,
                    }}
                        numberOfLines={1}
                    >地址：店铺地址信息...2k.....</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row-reverse", backgroundColor: "#fff", marginTop: 5 }}>
                <TouchableOpacity
                    style={{
                        marginRight: 5,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 16,
                        borderColor: mainColor,
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                    }}
                    onPress={() => this.onClickDelect(data)}>
                    <Text style={{
                        fontSize: 15,
                        color: mainColor,
                    }}>上架</Text>
                </TouchableOpacity>
            </View>
        </View>
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