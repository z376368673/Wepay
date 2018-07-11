import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from "../../util/HttpUtils";
import BaseUrl from "../../util/BaseUrl";

import RefreshFlatList2 from "../../common/RefreshFlatList2.js"
//我的店铺

export default class MyStore extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
            yue: 0,
            jifen: 0,
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
                for (let i = 0; i < 3; i++) {
                    arr.push(result.items[i])
                }
                this.refList.setData(arr)
            })
            .catch(error => {
                this.refList.setData([])
            })
    }
    /**
       * 绘制itemView
       * @param data
       * @returns {*}
       * @private
       */
    _getBuyOrSellItem(data) {
        return <View
            key={data.item.index}
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
                flexDirection: 'row',
                padding: 10
            }}>
            <Image
                style={{ width: 50, height: 50, marginLeft: 5 }}
                source={require("../../../res/images/banben.png")} />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, marginRight: 10 }}>
                <Text
                    style={{ color: "#333333", fontSize: 18 }}>{data.index} {data.item ? data.item.name : "name"}</Text>
                <Text style={{
                    color: "#666666",
                    marginTop: 5,
                    fontSize: 15,
                }}>{data.item ? data.item.description : "description"}</Text>
            </View>
            <TouchableOpacity
                onPress={() => this.onClickDelect(data)}>
                <Text style={{
                    marginRight: 5,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#cccccc"
                }}>删除</Text>
            </TouchableOpacity>
        </View>
    }
    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='我的店铺'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('订单', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.onClicks(1))}
                />

                {/* 收益布局*/}
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 10,
                    backgroundColor: mainColor
                }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.onClicks(2)}
                    >
                        <View style={{ flexDirection: 'column', }}>

                            <Text style={{ fontSize: 16, color: '#fff' }}>￥{this.state.yue}</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>今日收益</Text>
                        </View></TouchableOpacity>
                    <View style={{ height: 30, width: 0.5, backgroundColor: '#fff' }} />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.onClicks(3)}
                    >
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>￥{this.state.jifen}</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>总收益</Text>
                        </View></TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginTop: 10, paddingTop: 10, backgroundColor: "#f1f1f1" }}>
                    <RefreshFlatList2
                        ref={refList => this.refList = refList}
                        renderItem={(items) => this._getBuyOrSellItem(items)}
                        onRefreshs={() => this._refreshData()}
                    />
                </View>
            </View>
        );
    }

    onClicks(index) {
        alert(index)
        switch (index) {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;

            case 5:
                alert("卖出中心")
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