import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar, Platform,
} from 'react-native';
import BaseComponent, { BaseStyles, integralRelease } from "./BaseComponent";
import ViewUtils from "../util/ViewUtils";
import { Carousel } from 'teaset';
import Utils from "../util/Utils";
import DialogUtils from '../util/DialogUtils';
import AsySorUtils from '../dao/AsySorUtils';
import BaseUrl from '../util/BaseUrl';
import HttpUtils from '../util/HttpUtils';
import UserInfo from '../model/UserInfo';
import SplashScreen from "react-native-splash-screen"
import { observer, inject } from 'mobx-react';
const screen_width = Utils.getWidth();

@inject('AppStore') @observer
export default class HomePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            bannerArray: []
        }
        //this.props.AppStore.userInfo = this.props.AppStore.userInfo
    }
    componentDidMount() {
        SplashScreen.hide();
        this.getBanner();
        if (this.props.AppStore.userInfo.isReward === 0) {
            DialogUtils.redPacket(this.props.AppStore.userInfo.todayReleas,
                () => integralRelease(this.props.AppStore))
        }
        //获取经纬度 并赋值给全局变量
        Utils.getLocation((coords)=>{
            Utils.getCityInfoBy(
                JSON.stringify(coords.longitude), 
                JSON.stringify(coords.latitude),
                (addressComponent)=>{
                    this.userInfo = this.getUserInfo()
                    this.userInfo.longitude =addressComponent.longitude
                    this.userInfo.latitude =addressComponent.latitude
            })
        })
    }
    setImgToBanner(bannerArray) {
        var views = []
        bannerArray.forEach((element, index) => {
            views.push(
                <TouchableOpacity key={index.toString()} onPress={() => { alert(this.getImgUrl(element.pic)) }}>
                    <Image style={{ width: screen_width, height: screen_width / 4 }}
                        resizeMode='cover' source={{ uri: this.getImgUrl(element.pic) }} />
                </TouchableOpacity>)
        });
        return views;
    }
    /**
     * 获取banner图片
     */
    getBanner() {
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
            .catch(error => {
                DialogUtils.showToast("加载图片失败" + error.message)
            })
    }
    _itemView(callback, img, text) {
        return <TouchableOpacity

            activeOpacity={0.8}
            onPress={callback}
        >
            <View style={[BaseStyles.container_column,
            {
                width: screen_width / 3 - 1,
                height: screen_width / 3 - 1,
            }, styles.itemView]}>
                <Image source={img}
                    style={styles.itemImage} />
                <Text style={{ fontSize: 18, color: '#333', marginTop: 10 }}>{text}</Text>
            </View>
        </TouchableOpacity>
    }
    _StatusBar(statusBarColor) {
        return <View style={{ height: 20, backgroundColor: statusBarColor }}>
            <StatusBar
                animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                hidden={false}  //是否隐藏状态栏。
                backgroundColor={statusBarColor} //状态栏的背景色
                translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
            />
        </View>
    }
    render() {
        return (
            <View style={BaseStyles.container_column}>
                {this._StatusBar("#48b1a3")}
                <ScrollView>
                    <View style={BaseStyles.container_column}>

                        <View style={styles.container_top}>
                            {/*顶部 用户信息布局*/}
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.onClicks(11)}
                            >
                                <View
                                    style={[BaseStyles.container_row, { alignItems: 'center' }]}
                                >
                                    <Image source={{ uri: this.getImgUrl(this.props.AppStore.userInfo.imgHead) }}
                                        style={styles.headImg} />
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={styles.text}>
                                            UUID:{this.props.AppStore.userInfo.account}
                                        </Text>
                                        {ViewUtils.getCreditView(this.props.AppStore.userInfo.userCredit, 16, 15, "#fff")}
                                    </View>
                                    <Image style={{ width: 30, height: 30, borderRadius: 15 }}
                                        source={require('../../res/images/shezhi.png')}
                                    />
                                </View></TouchableOpacity>

                            {/*扫描二维码布局*/}
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.onClicks(12)}
                            ><View
                                style={[BaseStyles.container_column, {
                                    height: 160,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }]}>
                                    <Image
                                        style={{ width: 100, height: 100, marginLeft: 2 }}
                                        source={require('../../res/images/saoma.png')}
                                    />
                                    <Text style={{ fontSize: 18, color: '#fff', marginTop: 10 }}>扫 码 支 付</Text>
                                </View></TouchableOpacity>

                            {/* 余额积分布局*/}
                            <View style={[BaseStyles.container_row, {
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: 10
                            }]}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => this.onClicks(13)}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: "center" }}>
                                        <Text style={{ fontSize: 16, color: '#fff' }}>余额</Text>
                                        <Text style={{ fontSize: 16, color: '#fff' }}>￥{this.props.AppStore.userInfo.cangkuNum}</Text>
                                    </View></TouchableOpacity>
                                <View style={{ height: 30, width: 0.5, backgroundColor: '#fff' }} />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => this.onClicks(14)}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: "center" }}>
                                        <Text style={{ fontSize: 16, color: '#fff' }}>积分</Text>
                                        <Text style={{ fontSize: 16, color: '#fff' }}>￥{this.props.AppStore.userInfo.fengmiNum}</Text>
                                    </View></TouchableOpacity>
                            </View>
                        </View>
                        <Carousel
                            style={{ width: screen_width, height: screen_width / 4 }}
                            control={() => { return <Carousel.Control /> }}
                        >
                            {this.setImgToBanner(this.state.bannerArray)}
                        </Carousel>
                        <View style={[BaseStyles.container_row, { flexWrap: 'wrap', }]}>
                            {this._itemView(() => this.onClicks(1), require('../../res/images/zhuanchu.png'), "转出")}
                            {this._itemView(() => this.onClicks(2), require('../../res/images/zhuanru.png'), "转入")}
                            {this._itemView(() => this.onClicks(3), require('../../res/images/mairu.png'), "买入")}
                            {this._itemView(() => this.onClicks(4), require('../../res/images/maichu.png'), "卖出")}
                            {this._itemView(() => this.onClicks(5), require('../../res/images/shuzi.png'), "数字资产")}
                            {this._itemView(() => this.onClicks(6), require('../../res/images/shangcheng.png'), "超级商城")}
                        </View>
                    </View>
                </ScrollView></View>
        );
    }

    onClicks(type) {
        switch (type) {
            case 11:
                this.props.navigation.navigate('SettingView');
                break;
            case 12:
                this.props.navigation.navigate('SaoSaoView');
                break;
            case 13:
                this.props.navigation.navigate('YueOrIntegralRecord', { type: 0 });
                break;
            case 14:
                this.props.navigation.navigate('YueOrIntegralRecord', { type: 1 });
                break;
            case 1:
                this.props.navigation.navigate('ZhuanChu');
                break;
            case 2:
                this.props.navigation.navigate('ZhuanRu');
                break;
            case 3:
                this.props.navigation.navigate('BuyPage');
                break;
            case 4:
                this.props.navigation.navigate('SellPage');
                break;
            case 5://数字资产
                this.props.navigation.navigate('ApplyStore');
                break;
            case 6://商城
                this.props.navigation.navigate('StoreMall');
                break;
            default://
                break
        }
    }

}
const styles = StyleSheet.create({
    container_top: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#48b1a3",
        padding: 10,
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
    headImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 1
    },
    itemView: {
        flexWrap: 'wrap',
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0.5,
        marginTop: 0.5,
    },
    itemImage: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderColor: "#fff"
    },
});
