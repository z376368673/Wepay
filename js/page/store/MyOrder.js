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
import ScrollableTabView ,{ScrollableTabBar} from "react-native-scrollable-tab-view"
import HttpUtils from "../../util/HttpUtils";
import BaseUrl from "../../util/BaseUrl";
import RefreshFlatList from "../../common/RefreshFlatList2.js"
import OrderCommon from "./OrderCommon"
//我的店铺

export default class MyOrder extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
            yue: 0,
            jifen: 0,
        }
    }
   
    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='我的订单'
                    navigation={this.props.navigation}
                />
            <ScrollableTabView
                    //背景色
                    tabBarBackgroundColor='fff'
                    //未选中的tabBar字体颜色
                    tabBarInactiveTextColor='#999'
                    //选中的tabBar字体颜色
                    tabBarActiveTextColor='#333'
                    //设置下划线样式
                    tabBarUnderlineStyle={{
                        backgroundColor: mainColor,
                        height: 2,
                    }}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <OrderCommon tabLabel='待付款' key={1}/>
                    <OrderCommon tabLabel='待发货' key={2}/>
                    <OrderCommon tabLabel='待收货' key={3}/>
                    <OrderCommon tabLabel='已完成' key={4} numColumns={2}/>
                </ScrollableTabView>            
            </View>
        );
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