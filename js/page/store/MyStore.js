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
import RefreshFlatList from "../../common/RefreshFlatList"
import DialogUtils from '../../util/DialogUtils';
//我的店铺

export default class MyStore extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            todayEarnings: 0, //今日收益
            totalRevenue: 0, //总收益
        }
        this.userInfo = this.getUserInfo();
    }
    //界面加载完成
    componentDidMount() {
        this._refreshData()
        this.getMyStoreEarnings()
    }


    /**
     * 店铺收益
     */
    getMyStoreEarnings() {
        let url = BaseUrl.getMyStoreEarnings(this.userInfo.sessionId)
        HttpUtils.getData(url)
            .then(result => {
                if (result.code === 1) {
                   // alert(JSON.stringify(result.data))
                    this.setState({
                        todayEarnings: result.data.todayEarnings,
                        totalRevenue: result.data.totalRevenue,
                    })
                } else {
                    DialogUtils.showToast(result.msg)
                }
            })
          
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
    * 获取数据
    * @param {*} isRefesh  是否刷新
    * @param {*} pageIndex 
    */
    getData(isRefesh) {
        this.url = BaseUrl.getMyStoreShop(this.userInfo.sessionId, this.pageIndex)
        HttpUtils.getData(this.url)
            .then(result => {
                if (result.code === 1) {
                    if (isRefesh) {
                        this.refList.setData(result.data)
                        if(result.data.length<1){
                            DialogUtils.showToast("暂无商品") }
                    }else {
                        this.refList.addData(result.data)
                    }
                    this.pageIndex += 1
                } else if (result.code === 2) {
                    DialogUtils.showToast(result.msg)
                    this.goLogin(this.props.navigation)
                } else {
                    DialogUtils.showToast(result.msg)
                }
            })
           
    }
    //上架下架
    editShopState(data) {
        let content;
        if (data.item.goodsStatus === 2) {
            this.url = BaseUrl.updateStatus(this.userInfo.sessionId, data.item.id, 1)
            content = "您确认要下架此商品？"
        } else {
            this.url = BaseUrl.updateStatus(this.userInfo.sessionId, data.item.id, 2)
            content = "您确认要上架此商品？"
        }
        //console.warn(this.url)
        editOrder = () => {
                DialogUtils.showLoading()
                HttpUtils.getData(this.url)
                .then(result => {
                    if (result.code === 1) {
                        if (data.item.goodsStatus === 2) {
                            data.item.goodsStatus = 1
                            this.refList.upData(data.index, data.item)
                        } else {
                            data.item.goodsStatus = 2
                            this.refList.upData(data.index, data.item)
                        }
                    } else {
                        DialogUtils.showToast(result.msg)
                    }
                    DialogUtils.hideLoading()
                })
            
            }
            DialogUtils.showPop(content, () => editOrder(), null, "确认", "取消")
    }


    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='我的店铺'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('订单', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.myorder())}
                />

                {/* 收益布局*/}
                <View style={[{
                    flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',
                    padding: 10, backgroundColor: mainColor
                }]}>
                    <TouchableOpacity
                        activeOpacity={0.8} >
                        <View style={{ flexDirection: 'column', alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>￥{this.state.todayEarnings}</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>今日收益</Text>
                        </View></TouchableOpacity>
                    <View style={{ height: 30, width: 0.5, backgroundColor: '#fff' }} />
                    <TouchableOpacity
                        activeOpacity={0.8}
                    >
                        <View style={{ flexDirection: 'column', alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>￥{this.state.totalRevenue}</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>总收益</Text>
                        </View></TouchableOpacity>
                </View>

                <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        isDownLoad={true}
                        renderItem={(items) => this._getBuyOrSellItem(items)}
                        onRefreshs={() => this._refreshData()}
                    />
                </View>
                <TouchableOpacity onPress={() => this.addShop()}>
                    <View style={{ flexDirection: "row", backgroundColor: mainColor, height: 48, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>+ </Text><Text style={{ fontSize: 15, color: "#fff" }}>添加商品</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    /**
     * 绘制itemView
     * @param data
     * @returns {*}
     * @private
     */
    _getBuyOrSellItem(data) {

        let shang = <TouchableOpacity
            style={{
                marginRight: 5,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: mainColor,
                marginLeft: 10,
            }}
            onPress={() => this.editShopState(data)}>
            <Text style={{
                color: "#fff",
                fontSize: 15,
            }}>{data.item.goodsStatus === 2 ? "下架" : "上架"}</Text>
        </TouchableOpacity>

        let xia = <TouchableOpacity
            style={{
                marginRight: 5,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 15,
                borderColor: "#ccc",
                borderWidth: 0.5,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
            }}
            onPress={() => this.editShopState(data)}>
            <Text style={{
                color: "#333",
                fontSize: 15,
            }}>下架</Text>
        </TouchableOpacity>

        return <View
            key={data.item.index}
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                marginBottom: 8,
                flexDirection: 'row',
                padding: 10
            }}>
            <Image
                style={{ width: 80, height: 80, }}
                source={{ uri: this.getImgUrl(data.item.coverPlan) }} />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, }}>
                <Text
                    style={{ color: "#333333", fontSize: 18 }}>{data.item ? data.item.goodsName : "name"}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{
                        color: "#d11",
                        fontSize: 15,
                    }}>￥{data.item.goodsPrice}</Text>
                    <Text style={{
                        color: "#888",
                        fontSize: 15,
                        marginLeft: 30,
                    }}>库存:{data.item.goodsStock}</Text>
                </View>

                <View style={{ flexDirection: "row-reverse", backgroundColor: "#fff", marginTop: 5 }}>
                    {data.item.goodsStatus === 2 ? xia : shang}
                    <TouchableOpacity
                        style={{
                            marginRight: 5,
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 8,
                            paddingRight: 8,
                            borderRadius: 15,
                            borderColor: "#ccc",
                            borderWidth: 0.5,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => this.editShop(data)}>
                        <Text style={{
                            color: "#333",
                            fontSize: 15,
                        }}>编辑商品</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }

    myorder() {//我的店铺订单
        this.props.navigation.navigate('MyStoreOrder');
    }
    addShop() {
        this.props.navigation.navigate('AddShop');
    }
    editShop(data) {
        this.props.navigation.navigate('AddShop', {
            data: data,
        });
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