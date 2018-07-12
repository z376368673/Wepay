import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor} from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import Utils from "../../util/Utils";
import HttpUtils from "../../util/HttpUtils";
import RefreshFlatList from "../../common/RefreshFlatList";

const URL = 'https://api.github.com/search/repositories?q=';
/**
 * 公告
 */


const width = Utils.getWidth()
export default class NoticeList extends BaseComponent{
    constructor(props) {
        super(props);
        this.index = 1
    }

    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title="公告"
                    navigation={this.props.navigation}
                />
                <View style={{flex: 1, marginTop: 10, paddingTop: 10, backgroundColor: "#f1f1f1"}}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        renderItem={(items) => this._getBuyOrSellItem(items)}
                        onRefreshs={() => this._refreshData()}
                        onLoadData={() => this._onLoadData()}
                    />
                </View>
            </View>
        );
    }

    //加载更多数据
    _onLoadData() {
        this.refList.addData([])
    }

    //刷新数据
    _refreshData(value) {
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
     * 进入公告详情
     * @param data
     */
    onClick(data) {
        this.props.navigation.navigate('NoticDetails',{
            type:0,
        })
    }

    /**
     * 绘制itemView
     * @param data
     * @returns {*}
     * @private
     */
    _getBuyOrSellItem(data) {
        return <TouchableOpacity
            onPress={() => this.onClick(data)}>
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
                <View style={{flexDirection: "row", alignItems: "center"}}>

                    <Text style={{
                        color: "#333",
                        marginTop: 5,
                        fontSize: 18,
                    }}>公告</Text>
                    {data.index > 0 ?
                        <View style={{backgroundColor: "#d11", width: 8, height: 8, borderRadius: 4, marginLeft: 5}}/> :
                        <View/>}
                </View>
                <Text style={{
                    color: "#666666",
                    marginTop: 5,
                    fontSize: 16, }}
                      numberOfLines={1}
                >{data.item ? data.item.description : "description"}</Text>
                <View style={{alignItems: "flex-end"}}>
                    <Text style={{
                        color: "#666666",
                        marginTop: 5,
                        fontSize: 16,
                    }}>{"2018/06/30 16:53"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}
