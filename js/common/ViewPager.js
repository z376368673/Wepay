import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles } from "../page/BaseComponent";
import HttpUtils from "../util/HttpUtils";
import BaseUrl from '../util/BaseUrl';
import DialogUtils from '../util/DialogUtils';
import FastImage from 'react-native-fast-image'
import { Carousel } from 'teaset';


//订单公用类（相当于Fragment）
const window_w = require('Dimensions').get('window').width;
export const KEYS = [""]
export default class ViewPager extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            bannerArray: [],
        }
        this.userInfo = this.getUserInfo();
    }

    static defaultProps = {
        height: window_w / 3,//默认高度
        width: window_w,
    }

    //界面加载完成
    componentDidMount() {
       this.getData()
    }

    /**
    * 获取数据
    * @param {*} isRefesh  是否刷新
    * @param {*} pageIndex 
    */
    getData() {
        let url = BaseUrl.getBanner()
        HttpUtils.getData(url)
            .then(result => {
                if (result.code === 1) {
                    this.setState({
                        bannerArray: result.data
                    })
                } else {
                    DialogUtils.showToast(result.msg)
                }
            })
    }

    setImgToBanner(bannerArray) {
        var views = []
        bannerArray.forEach((element, index) => {
            views.push(
                <TouchableOpacity key={index.toString()} onPress={() => { }} activeOpacity={1}>
                    <Image style={{ width:this.props.width, height: this.props.height }}
                           resizeMode='cover' source={{ uri: this.getImgUrl(element.pic) }} />
                </TouchableOpacity>)
        });
        return views;
    }

    render() {
        return (
                <Carousel
                    style={{ width: this.props.width, height: this.props.height }}
                    control={() => { return <Carousel.Control /> }}
                >
                    {this.setImgToBanner(this.state.bannerArray)}
                </Carousel>
        );
    }

    /** 商品
      * 绘制itemView
      * 3.1	id		商品id
      3.2	goodsName		商品名称
      3.3	goodsPrice		商品价格
      3.4	goodsStock		商品库存
      3.5	coverPlan		商品封面图
      3.6	shopId		店铺id
      * @param data
      * @returns {*}
      * @private
      */
    _getStore(data) {
        return <View
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                marginBottom: 4,
                flexDirection: "column",
                marginLeft: 2,
                marginRight: 2,
                maxWidth: window_width / 2 - 4,
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{ width: window_w / 2 - 4, height: window_w / 2, }}
                onPress={(item) => this.goDetails(data.item)}>
                <FastImage
                    style={{ width: window_w / 2 - 4, height: window_w / 2, }}
                    source={{ uri: this.getImgUrl(data.item.coverPlan) }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', padding: 5, height: 60, justifyContent: "center", alignContent: "center" }}>
                <Text style={{ color: "#333333", fontSize: 18, }} numberOfLines={1}>
                    {data.item ? data.item.goodsName : "name"}</Text>

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
            </View>
        </View>
    }
    /**
       * 去商品详情
       * @param {*} item 
       */
    goDetails(item) {
        this.props.navigation.navigate('ShopDetails', {
            shopId: item.id,
        });
    }
    /**商铺
      * 绘制itemView
      * @param data
      * @returns {*}
      * 3.1	id		店铺id
      3.2	uid		用户id
      3.3	shopName		店铺名称
      3.4	shopAddress		店铺地址
      3.5	imgHead		头像
      3.6	distance		距离（单位米）
      * @private
      */
    _getStoreMall(data) {
        var distance;
        if (data.item.distance > 1000) {
            distance = data.item.distance / 1000 + "千米"
        } else {
            distance = data.item.distance + "米"
        }
        return <View
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                marginBottom: 8,
                flexDirection: 'row',
                padding: 10
            }}>
            <Image
                style={{ width: 60, height: 60, borderWidth: 1, borderRadius: 30, borderColor: "#d11" }}
                source={{ uri: this.getImgUrl(data.item.imgHead) }} />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, }}>
                <Text
                    style={{ color: "#333333", fontSize: 18 }}>{data.item ? data.item.shopName : "name"}</Text>
                <View style={{ marginTop: 5, flexDirection: "column" }}>
                    <Text style={{
                        color: "#888",
                        fontSize: 15,
                        flex: 1,
                    }}
                        numberOfLines={1}
                    >{distance}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row-reverse", backgroundColor: "#fff", marginTop: 5 }}>
                <TouchableOpacity
                    style={{
                        marginRight: 5,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 16,
                        borderColor: mainColor,
                        borderWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                    }}
                    onPress={() => this.onComeInStore(data)}>
                    <Text style={{
                        fontSize: 15,
                        color: mainColor,
                    }}>进店</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
    onComeInStore(data) {
        this.props.navigation.navigate('StoreDetails', {
            storeId: data.item.id,
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