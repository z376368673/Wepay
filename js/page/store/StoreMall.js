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
import { SegmentedBar } from 'teaset';
import RefreshFlatList from "../../common/RefreshFlatList.js"
import Utils from '../../util/Utils';
import ScrollableTabView ,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import OrderCommon from './OrderCommon';

//购物中心
const window_w = Utils.getWidth();
export default class MyStore extends BaseComponent {
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
       //AddShop.js this._refreshData()
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
                    rightView={NavigationBar.getRightStyle_Text('订单', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.onClicks(1))}
                />
                <SegmentedBar
                    justifyItem={"fixed"}
                    indicatorLineColor={mainColor}
                    indicatorLineWidth={2}
                    indicatorPositionPadding={5}
                    activeIndex={activeIndex}
                    onChange={index => this.onSegmentedBarChange(index)}
                >
                    {this.renderCustomItems()}
                </SegmentedBar>
                   <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
                  {this.state.activeIndex===0?<OrderCommon tabLabel='商品' numColumns={2}/>:<View/>  } 
                  {this.state.activeIndex===1?<OrderCommon tabLabel='商铺' numColumns={1}/>:<View/>  } 
                        {/* <RefreshFlatList
                            ref={refList => this.refList = refList}
                            numColumns={this.state.activeIndex === 0?2:1}
                            onRefreshs={() => this._refreshData()}
                            onLoadData={() => this._onLoadData()}
                            renderItem={(items) => this.state.activeIndex === 0?this._getStore(items):this._getStoreMall(items)} /> */}
                    </View> 
            </View>
        );
    }
   
    onClicks(index) {
        switch (index) {
            case 1:
            this.props.navigation.navigate('MyOrder');
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