import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    ImageBackground,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from "../../util/HttpUtils";
import BaseUrl from "../../util/BaseUrl";
import RefreshFlatList2 from "../../common/RefreshFlatList2"
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
                marginBottom: 8,
                flexDirection: 'row',
                padding: 10
            }}>
            <Image
                style={{ width: 80, height: 80, }}
                source={require("../../../res/images/banben.png")} />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, }}>
                <Text
                    style={{ color: "#333333", fontSize: 18 }}>{data.index} {data.item ? data.item.name : "name"}</Text>
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

                <View style={{ flexDirection: "row-reverse", backgroundColor: "#fff", marginTop: 5 }}>
                    <TouchableOpacity
                        style={{
                            marginRight: 5,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingLeft: 15,
                            paddingRight: 15,
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: mainColor,
                            marginLeft: 10,
                        }}
                        onPress={() => this.onClickDelect(data)}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 15,
                        }}>上架</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginRight: 5,
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 8,
                            paddingRight: 8,
                            borderRadius: 15,
                            borderColor: "#ccc",
                            borderWidth: 0.5,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => this.onClickDelect(data)}>
                        <Text style={{
                            color: "#333",
                            fontSize: 15,
                        }}>编辑商品</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
    onClickDelect(data) {

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
                <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
                    <RefreshFlatList2
                        ref={refList => this.refList = refList}
                        renderItem={(items) => this._getBuyOrSellItem(items)}
                        onRefreshs={() => this._refreshData()}
                    />
                </View>
                <TouchableOpacity onPress={()=>this.onClicks("add")}>
                    <View style={{ flexDirection: "row", backgroundColor: mainColor, height: 48, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>+ </Text><Text style={{ fontSize: 15, color: "#fff" }}>添加商品</Text>
                    </View>
                </TouchableOpacity>
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
            case "add":
            this.props.navigation.navigate('BankCardList');
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