import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, { BaseStyles } from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import Utils from "../util/Utils";
import RefreshFlatList from "../common/RefreshFlatList";
import HttpUtils from "../util/HttpUtils";
import BaseUrl from '../util/BaseUrl';

const URL = 'https://api.github.com/search/repositories?q=';
/**
 * 余额,积分记录
 */


const width = Utils.getWidth()
export default class YueOrIntegralRecord extends BaseComponent {
    pageIndex = 1;
    constructor(props) {
        super(props);
        this.userInfo = this.getUserInfo();
    }

    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }

    render() {
        const { navigation } = this.props;
        this.type = navigation.state.params.type ? navigation.state.params.type : 0;
        const title = this.type === 0 ? "余额记录" : "积分记录"
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={title}
                    navigation={this.props.navigation}
                />

                <View style={[{
                    flexDirection: 'row',
                    padding: 15,
                    backgroundColor: "#fff",
                }]}>
                    <View style={{ alignItems: 'center', width: width / 4 - 10, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>业务类型</Text>
                    </View>
                    <View style={{ alignItems: 'center', width: 0.5, backgroundColor: "#999" }} />
                    <View style={{ alignItems: 'center', width: width / 4 - 10, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>数额</Text>
                    </View>
                    <View style={{ alignItems: 'center', width: 0.5, backgroundColor: "#999" }} />
                    <View style={{ alignItems: 'center', width: width / 4 + 4, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>当前{ this.type === 0 ? "余额" : "积分"}</Text>
                    </View>
                    <View style={{ alignItems: 'center', width: 0.5, backgroundColor: "#999" }} />
                    <View style={{ alignItems: 'center', width: width / 4 + 14, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>时间</Text>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 1, backgroundColor: "#fff" }}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        onRefreshs={() => {
                            this._refreshData()
                        }}
                        onLoadData={() => {
                            this._onLoadData()
                        }}
                        renderItem={(item) => this._getItem(item)} />
                </View>
            </View>
        );
    }

   
    //加载更多数据
    _onLoadData() {
        this.getData(false)
    }
    /**
     * 获取数据
     * @param {*} isRefesh  是否刷新
     * @param {*} pageIndex 
     */
    getData(isRefesh) {
        if (this.type === 0) {
            this.url = BaseUrl.getExchangeRecordJ(this.userInfo.sessionId, this.pageIndex)
        } else {
            this.url = BaseUrl.getExchangeRecordY(this.userInfo.sessionId, this.pageIndex)
        }
        HttpUtils.getData(this.url)
            .then(result => {
                if (result.code === 1) {
                    if (isRefesh) {
                        this.refList.setData(result.data)
                    } else {
                        this.refList.addData(result.data)
                        this.pageIndex += 1
                    }
                } else {
                    DialogUtils.showToast(result.msg)
                }
            })
            .catch(error => {
                this.refList.setData([])
                DialogUtils.showToast("error:" + error.message)
            })
    }
    //刷新数据
    _refreshData() {
        this.refList.refreshStar()
        this.pageIndex = 1;
        this.getData(true)
    }
    _getItem(data) {
        return <View style={{
            borderBottomWidth:0.5,
            borderColor: '#CCC',
            backgroundColor: '#fff',
            paddingBottom:10,
            paddingTop:10,
            paddingLeft:5,
            paddingRight:5,
        }}>
            <TouchableOpacity onPress={() => {
                // alert('点击')
            }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{justifyContent:"center", alignItems: 'center', width: width / 4 - 10, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>{data.item.getType}</Text>
                    </View>
                    <View style={{ justifyContent:"center",alignItems: 'center', width: width / 4 - 10, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>{data.item.getNums}</Text>
                    </View>
                    <View style={{ justifyContent:"center",alignItems: 'center', width: width / 4 + 4, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>{data.item.nowNums}</Text>
                    </View>
                    <View style={{ justifyContent:"center",alignItems: 'center', width: width / 4 + 14, }}>
                        <Text style={{
                            color: '#333',
                            fontSize: 15,
                        }}>{Utils.formatDateTime(data.item.getTime*1000,"-")}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    }
}