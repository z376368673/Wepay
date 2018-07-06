import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, {BaseStyles} from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import Utils from "../util/Utils";
import RefreshFlatList from "../common/RefreshFlatList";
import HttpUtils from "../util/HttpUtils";

const URL = 'https://api.github.com/search/repositories?q=';
/**
 * 余额,积分记录
 */


const width = Utils.getWidth()
export default class YueOrIntegralRecord extends BaseComponent {
    constructor(props) {
        super(props);
    }

    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }


    render() {
        const {navigation} = this.props;
        const type = navigation.state.params.type ? navigation.state.params.type : 0;
        const title = type === 0 ? "余额记录" : "积分记录"
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
                    <View style={{alignItems: 'center', width: width / 3 - 2,}}>
                        <Text style={{
                            color: '#333',
                            fontSize: 18,
                        }}>业务类型</Text>
                    </View>
                    <View style={{alignItems: 'center', width: 1, backgroundColor: "#999"}}/>
                    <View style={{alignItems: 'center', width: width / 3,}}>
                        <Text style={{
                            color: '#333',
                            fontSize: 18,
                        }}>数额</Text>
                    </View>
                    <View style={{alignItems: 'center', width: 1, backgroundColor: "#999"}}/>
                    <View style={{alignItems: 'center', width: width / 3,}}>
                        <Text style={{
                            color: '#333',
                            fontSize: 18,
                        }}>时间</Text>
                    </View>
                </View>
                <View style={{flex: 1, marginTop: 10, paddingTop: 10, backgroundColor: "#fff"}}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        onRefreshs={() => {
                            this._refreshData()
                        }}
                        onLoadData={() => {
                            this._onLoadData()
                        }}
                        renderItem={(items) => this._getBuyOrSellItem(items)}/>
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
                <View style={{flexDirection: 'column',}}>
                    <Text style={{color: "#333333", fontSize: 20,}}>{items.item ? items.item.name : "name"}</Text>
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
