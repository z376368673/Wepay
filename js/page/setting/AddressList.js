import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import Utils from "../../util/Utils";
import HttpUtils from "../../util/HttpUtils";
import RefreshFlatList2 from "../../common/RefreshFlatList2";
import { Checkbox } from "teaset"
import DialogUtils from '../../util/DialogUtils';

const URL = 'https://api.github.com/search/repositories?q=';
/**
 * 地址管理
 */


const width = Utils.getWidth()
export default class AddressList extends BaseComponent {
    constructor(props) {
        super(props);
        this.index = 1
        this.state = {
            selectIndex: 0,
        }
    }

    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title="地址管理"
                    navigation={this.props.navigation}
                />
                <View style={{ flex: 1, marginTop: 10, paddingTop: 10, backgroundColor: "#f1f1f1", marginBottom: 65 }}>
                    <RefreshFlatList2
                        ref={refList => this.refList = refList}
                        renderItem={(items) => this._getBuyOrSellItem(items)}
                        onRefreshs={() => this._refreshData()}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=>this.addAddress()}
                    style={{
                        height: 45,
                        marginTop: 40,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute",
                        bottom: 15,
                        left: 15,
                        right: 15,
                        backgroundColor: mainColor,
                    }}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}> 创建订单</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //刷新数据
    _refreshData(value) {
        this.refList.refreshStar()
        HttpUtils.getData(URL + value)
            .then(result => {
                var arr = [];
                for (let i = 0; i < 15; i++) {
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
        let isChecked = this.state.selectIndex === data.index ? true : false;
        return <TouchableOpacity>
        <View
            key={data.item.index}
            style={{
                backgroundColor: '#fff',
                //alignItems: 'center',
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
                flexDirection: 'column',
                padding: 10
            }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <Text style={{
                    flex: 1,
                    color: "#333",
                    fontSize: 18,
                }}>消息标题</Text>
                <Text style={{
                    color: "#333",
                    fontSize: 18,
                    flexDirection: "row-reverse"
                }}>18792463256</Text>
            </View>
            <Text style={{
                color: "#666666",
                fontSize: 16,
                marginTop: 15
            }}
                numberOfLines={1}
            >{data.item ? data.item.description : "description"}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
                <View style={{ flex: 1, padding: 10 }}>
                    <Checkbox
                        title='默认地址'
                        size='md'
                        checked={isChecked}
                        onChange={value => this.defaultAddress(data)}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end", flexDirection: "row-reverse", }}>
                    <TouchableOpacity
                        onPress={() => this.editCallBack(data)}>
                    <Text style={{
                            color: "#666666",
                            fontSize: 16,
                            alignSelf: "auto",
                            padding: 10,
                        }}>编辑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.delCallBack(data)}>
                        <Text style={{
                            color: "#666666",
                            fontSize: 16,
                            alignSelf: "auto",
                            padding: 10,
                        }}>删除</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </TouchableOpacity>
    }

    /**
     * 删除地址
     * @param {*} data 
     */
    delCallBack(data) {
        DialogUtils.showDownSheet(["删除"],()=>{
            DialogUtils.showToast("删除此地址");
        });
    }
    /**
     * 编辑地址
     * @param {*} data 
     */
    editCallBack(data) {
        this.props.navigation.navigate('EditAddress',{
            addrss:data,
            editCallBack:()=>{
                DialogUtils.showToast("刷新界面");
            }
        })
    }
    /**
     * 添加新地址
     */
    addAddress() {
        this.props.navigation.navigate('EditAddress')
    }
    /**
     * 设置默认地址
     * @param {*} data 
     */
    defaultAddress(data) {
        
    }
}
