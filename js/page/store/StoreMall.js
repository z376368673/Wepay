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
import RefreshFlatList2 from '../../common/RefreshFlatList2';

//商城首页
const window_w = Utils.getWidth();
export default class StoreMall extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            activeIndex: 0,
            typeArr:[]
        }
        this.barItems = [
            '商品',
            '商铺',
        ];
    }
    //界面加载完成
    componentDidMount() {
        SplashScreen.hide();
        //加载商品的分类
       // this.getCateList();
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
                    rightView={NavigationBar.getRightStyle_View(require("../../../res/images/dingdan-shang.png"),()=>this.onClicks(1))}
                   // rightView={this.getRightStyle_View()}
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
                    {this.state.activeIndex === 0 ? <StoreCommon navigation={this.props.navigation} tabLabel='商品' numColumns={2} /> : <View />}
                    {this.state.activeIndex === 1 ? <StoreCommon navigation={this.props.navigation} tabLabel='商铺' numColumns={1} /> : <View />}
                </View>
            </View>
        );
    }
    searchView() {
        return (<View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.onClicks(2)}
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                <View style={{ marginLeft: 0, width: 245, backgroundColor: "#fff", height: 35, borderRadius: 18, flexDirection: "row", alignItems: "center" }}>
                    <Image style={{ height: 30, width: 30, marginLeft: 10, padding: 5, }} source={require("../../../res/images/sousuo-shang.png")} />

                    <Text
                        style={[{
                            fontSize: 13, color: '#999', backgroundColor: "#fff", marginRight: 20, padding: 10,
                            borderColor: "#ccc",
                        }]}
                    >请输入商品名称</Text>
                </View></TouchableOpacity>
        </View>);
    }

    //导航右边更多按钮
    getRightStyle_View() {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', }}
                    onPress={() => this.leftDrawView()}
                >
                    <Image
                        style={{ width: 25, height: 25, padding: 5 }}
                        source={require("../../../res/images/fenleisousuo.png")} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', }}
                    onPress={() => this.onClicks(1)}
                >
                    <Image
                        style={{ width: 25, height: 25, padding: 5, marginLeft: 10 }}
                        source={require("../../../res/images/dingdan-shang.png")} />
                </TouchableOpacity>
            </View>)
    }
    
    onClicks(index) {
        switch (index) {
            case 1:
                this.props.navigation.navigate('MyOrder');
                break;
            case 2:
                this.props.navigation.navigate('SearchStore');
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