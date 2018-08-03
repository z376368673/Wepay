import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import AutoGrowingTextInput from '../../common/AutoGrowingTextInput';
import NavigationBar from "../../common/NavigationBar";
import BaseComponent, { BaseStyles, mainColor, window_width, window_height } from "../BaseComponent";
import { PullPicker } from 'teaset';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';
import DialogUtils from '../../util/DialogUtils';
import BaseUrl from '../../util/BaseUrl';
import HttpUtils from '../../util/HttpUtils';

/**
 * 商品详情
 */
const width_w = Utils.getWidth() / 2 - 20;
export default class ShopDetails extends BaseComponent {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state
        //商品id
        shopId = params ? params.shopId : null, 
            this.state = {
                shopName: "商品名称",
                shopPrice: 23.23,
                shopNum: 100,
                shopImage: require("../../../res/images/default_shop.png"),
                storeId:"",//		店铺id
            }
        this.navigation = this.props.navigation;
        this.userInfo = this.getUserInfo()
    }
    componentDidMount(){
       this.getShopDetail()
    }
    /**
     * 获取商品信息 by id 
     */
    getShopDetail(){
        let url =  BaseUrl.getShopDetail(this.userInfo.sessionId,shopId)
        HttpUtils.getData(url)
        .then(result => {
            if (result.code===1) {
                this.info = result.data
                this.setState({
                    shopName: this.info.goodsName,
                    shopPrice: this.info.goodsPrice,
                    shopNum: this.info.goodsStock,
                    shopImage: {uri:this.getImgUrl(this.info.coverPlan)},
                    storeId:this.info.shopId,
                })
            }else{
                DialogUtils.showToast(result.msg)
            }
        })
        .catch(error => {
            DialogUtils.showToast("服务器繁忙"+error.message)
        })
    }

    /**
    * 使用方式sync/await
    * 相册参数暂时只支持默认参数中罗列的属性；
    * @returns {Promise<void>}
    */
    // handleAsyncSelectPhoto = async (isCrop, showCropCircle) => {
    //     SYImagePicker.removeAllPhoto()
    //     try {
    //         const photos = await SYImagePicker.asyncShowImagePicker({ imageCount: 1, isCrop: isCrop, showCropCircle: showCropCircle });
    //         photos.map((photo, index) => {
    //             let source = { uri: photo.uri };
    //             if (photo.enableBase64) {
    //                 source = { uri: photo.base64 };
    //             }
    //             this.setState({ shopImage: source }, )
    //         })
    //     } catch (err) {
    //         // 取消选择，err.message为"取消"
    //         // alert(err,photos)
    //     }
    // };


    render() {
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={this.state.shopName}
                    navigation={this.props.navigation}
                />
                <ScrollView >
                    <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                        <TouchableOpacity
                            onPress={() => this.handleAsyncSelectPhoto(false, false)}
                        ><Image
                                style={{ flex: 1, width: window_width, height: window_height / 3 * 1.7, backgroundColor: "#fff" }}
                                source={this.state.shopImage}
                            /></TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: '#333',
                                    fontSize: 16,
                                }}>{this.state.shopName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 ,marginBottom:10,}}>
                            <Text style={{
                                color: "#d11",
                                fontSize: 15,
                            }}>￥{this.state.shopPrice}</Text>
                            <Text style={{
                                color: "#888",
                                fontSize: 15,
                                marginLeft: 30,
                                flex: 1,
                            }}>库存:{this.state.shopNum}</Text>

                            {/* <Text style={{
                                color: "#888",
                                fontSize: 15,
                                marginLeft: 30,
                            }}>距离:{3}km</Text> */}
                        </View>

                    </View>
                </ScrollView>

                <View style={{
                    flexDirection: "row",
                    height: 50,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#fff",
                }}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", }}
                        activeOpacity={0.8}
                        onPress={() => this.onClicks("store")}>
                        <View style={{ flex: 1, }}>
                            <Text style={{
                                alignSelf: "center",
                                color: '#333',
                                fontSize: 18,
                                padding: 15,
                            }}>联系商家</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#d11", }}
                        activeOpacity={0.8}
                        onPress={() => this.buy()}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                alignSelf: "center",
                                color: '#FFF',
                                fontSize: 18,
                                padding: 15,
                            }}>立即购买</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>

        );
    }
    onClicks(type) {
        if (type === "sumbitApply") {
            this.props.navigation.navigate('MyStore');
        }else if (type === "store") {
            this.props.navigation.navigate('StoreDetails',{
                storeId:this.state.storeId
            });
        }else if (type === "buy") {
            this.props.navigation.navigate('StoreDetails',{
                storeId:this.state.storeId
            });
        }
    }

    buy(){
        this.props.navigation.navigate('CreatOrder',{
            data:this.info
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
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 0.5
    },
    itemText: {
        fontSize: 16, color: "#333", width: 80
    },
    itemTextInput: {
        height: 35, flex: 1, fontSize: 16, color: '#333', backgroundColor: "#fff", padding: 5,
        borderWidth: 0.5, borderColor: "#ccc",
    }
});