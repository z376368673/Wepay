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
import { SegmentedBar, Drawer } from 'teaset';
import Utils from '../../util/Utils';
import StoreCommon from '../../common/StoreCommon';
import SplashScreen from "react-native-splash-screen"
import ViewUtils from '../../util/ViewUtils';
import RefreshFlatList from "../../common/RefreshFlatList"

//购物中心
const window_w = Utils.getWidth();
export default class SearchStore extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
            activeIndex: 0,
        }
        this.barItems = [
            '商品',
            '商铺',
        ];
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
    onSegmentedBarChange(index) {
        if (index != this.state.activeIndex) {
            this.setState({ activeIndex: index });
        }
    }
    renderCustomItems() {
        let { activeIndex } = this.state;
        return this.barItems.map((item, index) => {
            let isActive = index == activeIndex;
            let tintColor = isActive ? mainColor : '#333';
            return (
                <View key={index} style={{ padding: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, color: tintColor, paddingTop: 4 }} >{item}</Text>
                </View>
            );
        });
    }
    render() {
        let { activeIndex } = this.state;
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='购物中心'
                    navigation={this.props.navigation}
                    titleView={() => this.searchView()}
                    rightView={NavigationBar.getRightStyle_View(require("../../../res/images/sousuo.png"),()=>this.onClicks(1))}
            
                />
                <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
                <RefreshFlatList
                    ref={refList => this.refList = refList}
                    numColumns={ 2 }
                    onRefreshs={() => this._refreshData()}
                    onLoadData={() => this._onLoadData()}
                    renderItem={(items) =>  this._getStore(items)} />
            
                </View>
            </View>
        );
    }
    searchView() {
        return (<View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{  width: 230, backgroundColor: "#fff", height: 35, borderRadius: 18, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ height: 30, width: 30, marginLeft: 10 }} source={require("../../../res/images/sousuo-shang.png")} />
                <TextInput
                    style={[{
                        height: 35, flex: 1, fontSize: 13, color: '#333', backgroundColor: "#fff", padding: 5, marginRight: 20,
                        borderColor: "#ccc",
                    }]}
                    placeholder={'请输入商品名称'}
                    //defaultValue={userName}
                    placeholderTextColor={'#999'}
                    underlineColorAndroid='transparent'
                    keyboardType={"default"}
                    maxLength={12}
                    onChangeText={(text) => this.setState({ shopPrice: text })} />
            </View>
        </View>);
    }

    onClicks(index) {
        switch (index) {
            case 1:
                break;
            default:
                break;
        }
    }

      /** 商品
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
                        source={require("../../../res/images/default_shop.png")} />
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

}
export const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position:"absolute",  //绝对布局
    },
});