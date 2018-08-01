import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../page/BaseComponent";
import HttpUtils from "../util/HttpUtils";
import BaseUrl from "../util/BaseUrl";
import RefreshFlatList from "./RefreshFlatList"
import Utils from '../util/Utils';
import DialogUtils from '../util/DialogUtils';

//订单公用类（相当于Fragment）
const window_w = Utils.getWidth();
export default class OrderCommon extends BaseComponent {
    constructor(props) {
        super(props);
        this.tabLabel = this.props.tabLabel;
        this.numColumns = this.props.numColumns ? this.props.numColumns : 1
        //订单状态
        this.orderStatus = this.props.orderStatus ? this.props.orderStatus : 1;
        //用来区别我的订单 和 商户订单
        this.type = this.props.type ? this.props.type : 1;

        this.userInfo = this.getUserInfo()
        this.state = {
            //text: '18629448593',
        }
    }

    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }
    //刷新数据
    _refreshData() {
        this.refList.refreshStar()
        this.pageIndex = 1;
        this.getData(true)
    }
    //加载更多数据
    _onLoadData() {
        this.getData(false)
    }

    /**
    * 获取订单信息数据
    * @param {*} isRefesh  是否刷新
    * @param {*} pageIndex 
    */
    getData(isRefesh) {
        //alert(JSON.stringify(this.props))
        if (this.type === 1) {
            this.url = BaseUrl.getMyOrderBy(this.userInfo.sessionId, this.pageIndex, this.orderStatus)
        } else {
            this.url = BaseUrl.getStoreOrderBy(this.userInfo.sessionId, this.pageIndex, this.orderStatus)
        }
        // alert(this.tabLabel)
        HttpUtils.getData(this.url)
            .then(result => {

                if (result.code === 1) {
                    if (isRefesh) {
                        this.refList.setData(result.data)
                    } else {
                        this.refList.addData(result.data)
                        this.pageIndex += 1
                    }
                    if (result.data.length < 1) {
                        DialogUtils.showToast("暂无订单")
                        this.refList.setData([])
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
    onClickDelect(data) {

    }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <RefreshFlatList
                    ref={refList => this.refList = refList}
                    numColumns={this.numColumns}
                    onRefreshs={() => this._refreshData()}
                    onLoadData={() => this._onLoadData()}
                    renderItem={(data) => this.type === 1 ? this._getOrder1(data) : this._getOrder2(data)} />
            </View>
        );
    }
    /**
     * 
     * @param {*} item 
     */
    goDetails(item) {
        this.props.navigation.navigate('StoreDetails', {
            item: item,
        });
    }

    //加载更多数据
    _onLoadData() {
        setTimeout(() => {
            this.refList.addData(this.state.dataArray)
        }, 2000)
    }
    //联系商家
    goStoreDetails(data) {
        this.props.navigation.navigate('StoreDetails', {
            storeId: data.item.id,
        });
    }

    //修改订单状态
    confirmBtn(data, status) {
        let conten;
        if (status === 2) {  // 2 表示 已发货
            conten = "您确认已发货，请继续...，否则，请点击取消"
        } else if (status === 3) { //3 表示确认收货
            conten = "您确认已收到快递,请继续...,否则，请点击取消"
        }
        editOrder = () => {
            DialogUtils.showLoading()
            let url = BaseUrl.updateOrderStatus(this.userInfo.sessionId, data.item.id, status)
            HttpUtils.getData(url)
                .then(result => {
                    //alert(JSON.stringify(result))
                    if (result.code === 1) {
                        this.props.delBack(this.props.data.index)
                        DialogUtils.showMsg("订单已取消")
                    } else {
                        DialogUtils.showToast(result.msg)
                    }
                    DialogUtils.hideLoading()
                })
                .catch(error => {
                    DialogUtils.showMsg("error:" + error.message)
                    DialogUtils.hideLoading()
                })
        }
        DialogUtils.showPop(conten, () => editOrder(), null, "确认", "取消")
    }
    /**
      * 绘制itemView 我的订单
      * @param data
      * @returns {*}
      * @private
      */
    _getOrder1(data) {
        //联系商家
        let store = <TouchableOpacity
            onPress={() => this.goStoreDetails(data)}
            style={{
                borderWidth: 0.5, borderColor: "#666", borderRadius: 18, height: 30,
                justifyContent: "center", alignItems: "center",
                paddingLeft: 9, paddingRight: 9, paddingTop: 5, paddingBottom: 5
            }}>
            <Text style={{ color: "#666", fontSize: 13, }}>联系商家</Text>
        </TouchableOpacity>
        //确认收货
        let confirm = <TouchableOpacity
            onPress={() => this.confirmBtn(data, 3)}
            style={{
                borderRadius: 18, backgroundColor: mainColor, height: 30,
                justifyContent: "center", alignItems: "center", marginRight: 10,
                paddingLeft: 9, paddingRight: 9, paddingTop: 5, paddingBottom: 5
            }}>
            <Text style={{ color: "#fff", fontSize: 13, }}>确认收货</Text>
        </TouchableOpacity>
        //订单时间
        let orderDate1 = <Text style={{ color: "#888", fontSize: 13, marginLeft: 10, marginTop: 5, }}
            numberOfLines={1}
        >下单时间：{Utils.formatDateTime(data.item.buyTime * 1000)}</Text>
        let orderDate2 = <Text style={{ color: "#888", fontSize: 13, marginLeft: 10, marginTop: 5, }}
            numberOfLines={1}
        >发货时间：{Utils.formatDateTime(data.item.deliveryTime * 1000)}</Text>
        let orderDate3 = <Text style={{ color: "#888", fontSize: 13, marginLeft: 10, marginTop: 5, }}
            numberOfLines={1}
        >完成时间：{Utils.formatDateTime(data.item.dealTime * 1000)}</Text>
        //获得的积分
        let buyIntegral = <Text style={{ color: "#d60", fontSize: 13, marginTop: 5 }} numberOfLines={1} >获得{data.item.buyIntegral}积分</Text>

        return <View style={{ backgroundColor: "#fff", marginBottom: 8, paddingBottom: 10 }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ShopDetails', {
                    shopId: data.item.goodsId,
                })}>
                    <Image style={{ width: 100, height: 120 }} source={{ uri: this.getImgUrl(data.item.goodsImg) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <Text style={{ color: "#333", fontSize: 18, }} numberOfLines={1} >{data.item.goodsName}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#d11", fontSize: 16, marginTop: 8 }} numberOfLines={1} >￥{data.item.payMoney} </Text>
                        <Text style={{ color: "#999", fontSize: 12, marginTop: 8 }} numberOfLines={1} >   x{data.item.goodsNum}</Text>
                    </View>
                    {this.orderStatus === 3 ? buyIntegral : null}
                    <View style={{ flexDirection: "row-reverse", alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}>
                        {store} {this.orderStatus === 2 ? confirm : null}
                    </View>
                </View>
            </View>
            <Text style={{ color: "#888", fontSize: 15, marginLeft: 10, }}
                numberOfLines={1}
            >订单编号：{data.item.orderNo}</Text>
            {orderDate1}
            {this.orderStatus === 2 ? orderDate2 : null}
            {this.orderStatus === 3 ? orderDate3 : null}
        </View>
    }

    //买家信息
    showBuyerInfo(data) {
        DialogUtils.showMsg("买家信息")
    }

    /**
      * 绘制itemView 商铺订单
      * @param data
      * @returns {*}
      * @private
      */
    _getOrder2(data) {
        //买家信息 直接写在了订单最下面
        // let store = <TouchableOpacity
        //     onPress={() => this.showBuyerInfo(data)}
        //     style={{
        //         borderWidth: 0.5, borderColor: "#666", borderRadius: 18, height: 30,
        //         justifyContent: "center", alignItems: "center",
        //         paddingLeft: 9, paddingRight: 9, paddingTop: 5, paddingBottom: 5
        //     }}>
        //     <Text style={{ color: "#666", fontSize: 13, }}>买家信息</Text>
        // </TouchableOpacity>
        //确认发货
        let confirm = <TouchableOpacity
            onPress={() => this.confirmBtn(data, 2)}
            style={{
                borderRadius: 18, backgroundColor: mainColor, height: 30,
                justifyContent: "center", alignItems: "center", marginRight: 10,
                paddingLeft: 9, paddingRight: 9, paddingTop: 5, paddingBottom: 5
            }}>
            <Text style={{ color: "#fff", fontSize: 13, }}>确认发货</Text>
        </TouchableOpacity>
        //订单时间
        let orderDate1 = <Text style={{ color: "#888", fontSize: 13, marginLeft: 10, marginTop: 5, }}
            numberOfLines={1}
        >下单时间：{Utils.formatDateTime(data.item.buyTime * 1000)}</Text>
        let orderDate2 = <Text style={{ color: "#888", fontSize: 13, marginLeft: 10, marginTop: 5, }}
            numberOfLines={1}
        >发货时间：{Utils.formatDateTime(data.item.deliveryTime * 1000)}</Text>
        let orderDate3 = <Text style={{ color: "#888", fontSize: 13, marginLeft: 10, marginTop: 5, }}
            numberOfLines={1}
        >完成时间：{Utils.formatDateTime(data.item.dealTime * 1000)}</Text>
        //获得的积分 获得余额
        let sellerIncomeIntegral = <Text style={{ color: "#d60", fontSize: 13, marginTop: 5 }} numberOfLines={1} >获得{data.item.sellerIncomeIntegral}积分</Text>
        let sellerIncomeBalance = <Text style={{ color: "#d60", fontSize: 13 }} numberOfLines={1} >获得{data.item.sellerIncomeBalance}余额</Text>

        return <View style={{ backgroundColor: "#fff", marginBottom: 8, paddingBottom: 10 }}>
            <View style={{ flexDirection: "row", padding: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ShopDetails', {
                    shopId: data.item.goodsId,
                })}>
                    <Image style={{ width: 100, height: 120 }} source={{ uri: this.getImgUrl(data.item.goodsImg) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <Text style={{ color: "#333", fontSize: 18, }} numberOfLines={1} >{data.item.goodsName}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#d11", fontSize: 16, marginTop: 8 }} numberOfLines={1} >￥{data.item.payMoney} </Text>
                        <Text style={{ color: "#999", fontSize: 12, marginTop: 8 }} numberOfLines={1} >   x{data.item.goodsNum}</Text>
                    </View>
                    {this.orderStatus === 3 ? sellerIncomeIntegral : null}
                    {this.orderStatus === 3 ? sellerIncomeBalance : null}
                    <View style={{ flexDirection: "row-reverse", alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}>
                        {/* {store} */} {this.orderStatus === 1 ? confirm : null}
                    </View>
                </View>
            </View>
            <Text style={{ color: "#888", fontSize: 15, marginLeft: 10, }}
                numberOfLines={1}
            >订单编号：{data.item.orderNo}</Text>
            {orderDate1}
            {this.orderStatus === 2 ? orderDate2 : null}
            {this.orderStatus === 3 ? orderDate3 : null}
            <View style={{ backgroundColor: "#ddd", height: 1, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5 }} />
            <Text style={{ color: "#555", fontSize: 14, marginLeft: 10, marginTop: 5, }}
                numberOfLines={1}
            >收货人    ：{data.item.buyName}</Text>
            <Text style={{ color: "#555", fontSize: 14, marginLeft: 10, marginTop: 5, }}
                numberOfLines={1}
            >收货电话：{data.item.buyPhone}</Text>
            <Text style={{ color: "#555", fontSize: 14, marginLeft: 10, marginTop: 5, }}
            >收货地址：{data.item.buyAddress}</Text>
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