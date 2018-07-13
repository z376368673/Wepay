import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import DialogUtils from '../../util/DialogUtils';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';
import HttpUtils from '../../util/HttpUtils';
import BaseUrl from '../../util/BaseUrl';


export default class SettingView extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            userId: '123456',
            xinyong: 5,
            nickname: "哈哈",
            photos: [],//选择的照片
            headImg:require('../../../res/images/touxiang-xiao.png'),
        }
        this.getUserInfo((userInfo)=>{
            this.setState({
                headImg:{uri:userInfo.imgHead},
                nickname:userInfo.username,
                userId:userInfo.account,
                xinyong:userInfo.userCredit,
                sessionId:userInfo.sessionId,
            })
        })
    }

    /**
     * 使用方式sync/await
     * 相册参数暂时只支持默认参数中罗列的属性；
     * @returns {Promise<void>}
     */
    handleAsyncSelectPhoto = async () => {
        SYImagePicker.removeAllPhoto()
        try {
            const photos = await SYImagePicker.asyncShowImagePicker({ imageCount: 1, isCrop: true, showCropCircle: false });
            photos.map((photo, index) => {
                let source = { uri: photo.uri };
                if (photo.enableBase64) {
                    source = { uri: photo.base64 };
                }
                let imgs = [photo];
                this.uploadImage(imgs)
            })
        } catch (err) {
            DialogUtils.showToast(err.message)
            // 取消选择，err.message为"取消"
             alert(err.message)
        }
    };

    /**
     * 上传照片
     * @param {*} imgs 
     */
    uploadImage(imgs){
       let url =  BaseUrl.getUpdataHeadUrl()
        HttpUtils.uploadImage(url,{sessionId:this.state.sessionId},imgs,(result)=>{
            if(result.code===1){
                this.setState({
                    headImg: source
                })
            }else{
                DialogUtils.showToast(result.msg)
            }
        })
    }

    /**
     * 点击事件
     * @param type 点击标识
     */
    onClicks(type) {
        switch (type) {
            case "headImg"://修改头像
                this.handleAsyncSelectPhoto()
                break
            case "nickname"://修改昵称
                this.props.navigation.navigate('ModifyNickName', {
                    userName: this.state.nickname,
                    sessionId:this.state.sessionId,
                    callbacks: (name) => { this.getCallBackValue(name) }
                });
                break
            case "language"://多语言
                DialogUtils.showPop("请选择语言",
                    () => DialogUtils.showToast("你点击了确定"),
                    () => DialogUtils.showToast("你点击了取消")
                );
                break
            case "bankName"://我的银行卡
                this.props.navigation.navigate('BankCardList', {
                    title: "我的银行卡",
                });
                break
            case "share":
                this.props.navigation.navigate('SharePage');
                break
            case "password1"://修改 登陆密码
                this.props.navigation.navigate('ModifyPassWord', {
                    type: 0,
                });
                break
            case "password2"://修改 支付密码
                this.props.navigation.navigate('ModifyPassWord', {
                    type: 1,
                });
                break
            case "notice"://公告
                this.props.navigation.navigate('NoticeList', {
                    type: 1,
                });
                break
            case "geren"://个人消息
                this.props.navigation.navigate('MyNoticeList', {
                    type: 1,
                });
                break
            case "store"://我的店铺
                DialogUtils.showPop("您还没有开通店铺，是否去申请店铺",
                    () => {
                        this.props.navigation.navigate('ApplyStore');
                    },
                    () => { },
                    "去申请", "取消"
                );
                break
                case "order"://地址管理
                this.props.navigation.navigate('MyOrder');
                break
            case "address"://地址管理
                this.props.navigation.navigate('AddressList');
                break
            case "Complaint"://投诉建议
                this.props.navigation.navigate('Complaint');
                break
            case "version"://版本管理
                DialogUtils.showPop("您已经是最新版本了", () => {
                    DialogUtils.showToast("检查完毕");
                });
                break
        }
    }


    /**
     * 显示信用值的View
     * @param value
     * @param fontSize
     * @param width
     * @returns {*}
     */
    getCreditView(value, fontSize, width) {
        var views = [];
        for (let i = 0; i < value; i++) {
            views.push(<Image
                key={i}
                style={{ width: width, height: width / 4 * 3, marginLeft: 5 }}
                source={require('../../../res/images/xin.png')}
            />)
        }
        let view = <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: "#333", fontSize: fontSize, }}>信用: </Text>
            {views}
        </View>
        return view;
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <NavigationBar
                    title='设置'
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    <View style={[BaseStyles.container_column, { backgroundColor: '#f1f1f1' }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.onClicks("headImg")}
                        >
                            <View
                                style={[styles.container_row, { alignItems: 'center', padding: 10, }]}
                            >
                                <Image source={this.state.headImg}
                                    style={styles.headImg} />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ color: "#333", fontSize: 16, }}>
                                        UUID:{this.state.userId ? this.state.userId : "123456"}
                                    </Text>
                                    {this.getCreditView(this.state.xinyong, 16, 15)}
                                </View>
                                <Text style={{ color: "#666", fontSize: 16, marginRight: 10 }}>
                                    更换头像
                                </Text>
                            </View></TouchableOpacity>
                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem(require('../../../res/images/nicheng.png'), '昵称', this.state.nickname,
                            () => this.onClicks("nickname"))}
                        {ViewUtils.getSettingItem(require('../../../res/images/duoyuyan.png'), '多语言', '中文',
                            () => this.onClicks("language"))}
                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem1(require('../../../res/images/yinghangka.png'), '银行卡', false,
                            () => this.onClicks("bankName"))}
                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem1(require('../../../res/images/fenxiang.png'), '分享', false,
                            () => this.onClicks("share"))}
                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem(require('../../../res/images/denglumima.png'), '登陆密码', '点击修改',
                            () => this.onClicks("password1"))}
                        {ViewUtils.getSettingItem(require('../../../res/images/zhifumima.png'), '支付密码', '点击修改',
                            () => this.onClicks("password2"))}
                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem1(require('../../../res/images/gonggao.png'), '公告', false,
                            () => this.onClicks("notice"))}
                        {ViewUtils.getSettingItem1(require('../../../res/images/gonggao.png'), '个人信息', false,
                            () => this.onClicks("geren"))}

                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem1(require('../../../res/images/dianpu.png'), '我的店铺', false,
                            () => this.onClicks("store"))}
                        {ViewUtils.getSettingItem1(require('../../../res/images/wodedingdan.png'), '我的订单', false,
                            () => this.onClicks("order"))}
                        {ViewUtils.getSettingItem1(require('../../../res/images/dizhiguanli.png'), '地址管理', false,
                            () => this.onClicks("address"))}

                        <View style={[BaseStyles.container_center, { marginTop: 12 }]} />
                        {ViewUtils.getSettingItem1(require('../../../res/images/tousujianyi.png'), '投诉建议', false,
                            () => this.onClicks("Complaint"))}
                        {ViewUtils.getSettingItem(require('../../../res/images/banben.png'), '版本', '1.0.0',
                            () => this.onClicks("version"))}
                        {ViewUtils.getSettingItem1(require('../../../res/images/guanyu.png'), '关于', false,
                            () => this.onClicks(14))}

                        <View style={[BaseStyles.container_center, { marginTop: 25 }]} />
                        <TouchableOpacity
                            style={styles.logoutView}
                            onPress={() => this.onClicks(66)}
                        >
                            <Text style={{ fontSize: 18, color: mainColor, }}>退出登陆</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container_row: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#ffffff"
    },
    headImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    logoutView: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 80,
    },
});
