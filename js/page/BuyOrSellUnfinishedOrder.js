import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor } from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import Utils from "../util/Utils";
import RefreshFlatList from "../common/RefreshFlatList";
import HttpUtils from "../util/HttpUtils";
import { SegmentedBar, Label } from 'teaset';

const URL = 'https://api.github.com/search/repositories?q=';
/**
 * 买入/卖出  未完成订单
 */


const width = Utils.getWidth()
export default class BuyOrSellUnfinishedOrder extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            justifyItem: 'fixed',
            indicatorType: 'itemWidth',
            indicatorPosition: 'bottom',
            animated: true,
            autoScroll: true,
            activeIndex: 0,
        }
        this.barItems = [
            '未选择打款人',
            '已选择打款人',
        ];
    }
    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }
    onSegmentedBarChange(index) {
        if (index != this.state.activeIndex) {
            this.setState({ activeIndex: index });
            this._refreshData(index)
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
        const { navigation } = this.props;
        const type = navigation.state.params.type ? navigation.state.params.type : 0;
        let title = type === 0 ? "买入" : "卖出"
        let { justifyItem, activeIndex } = this.state;
        let barItems = this.barItems;
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={"未完成订单"}
                    navigation={this.props.navigation}
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

                <View style={{ flex: 1, backgroundColor: "#fff" }}>

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

    //加载更多数据
    _onLoadData() {
        setTimeout(() => {
            this.refList.addData(this.state.dataArray)
        }, 2000)
    }

    //刷新数据
    _refreshData(value) {
        this.refList.refreshStar()
        HttpUtils.getData(URL + value)
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

    _getBuyOrSellItem(items) {
        return <View style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#CCC',
            backgroundColor: '#fff',
            marginBottom: 8,
        }}>
            <TouchableOpacity onPress={() => {
                // alert('点击')
            }}>
                <View style={{ flexDirection: 'column', }}>
                    <Text style={{ color: "#333333", fontSize: 20, }}>{items.item ? items.item.name : "name"}</Text>
                    <Text style={{
                        color: "#666666",
                        marginTop: 5,
                        fontSize: 15,
                    }}>{items.item ? items.item.description : "description"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}
