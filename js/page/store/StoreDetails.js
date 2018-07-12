import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import AutoGrowingTextInput from '../../common/AutoGrowingTextInput';
import NavigationBar from "../../common/NavigationBar";
import BaseComponent, { BaseStyles, mainColor, window_width, window_height } from "../BaseComponent";
import { PullPicker } from 'teaset';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';
import DialogUtils from '../../util/DialogUtils';

/**
 * 添加商品
 */
const width_w = Utils.getWidth() / 2 - 20;
export default class StoreDetails extends BaseComponent {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state
        shaopInfo = params ? params.item : null,
            this.state = {
                shopName: "商品名称",
                shopPrice: 23.23,
                shopNum: 100,
                shopImage: require("../../../res/images/default_shop.png"),
            }
        this.navigation = this.props.navigation;
    }

    /**
    * 使用方式sync/await
    * 相册参数暂时只支持默认参数中罗列的属性；
    * @returns {Promise<void>}
    */
    handleAsyncSelectPhoto = async (isCrop, showCropCircle) => {
        SYImagePicker.removeAllPhoto()
        try {
            const photos = await SYImagePicker.asyncShowImagePicker({ imageCount: 1, isCrop: isCrop, showCropCircle: showCropCircle });
            photos.map((photo, index) => {
                let source = { uri: photo.uri };
                if (photo.enableBase64) {
                    source = { uri: photo.base64 };
                }
                this.setState({ shopImage: source }, )
            })
        } catch (err) {
            // 取消选择，err.message为"取消"
            // alert(err,photos)
        }
    };


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
                            />></TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: '#333',
                                    fontSize: 16,
                                }}>商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息商品信息</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 ,marginBottom:10,}}>
                            <Text style={{
                                color: "#d11",
                                fontSize: 15,
                            }}>￥{124}</Text>
                            <Text style={{
                                color: "#888",
                                fontSize: 15,
                                marginLeft: 30,
                                flex: 1,
                            }}>库存:{3}</Text>

                            <Text style={{
                                color: "#888",
                                fontSize: 15,
                                marginLeft: 30,
                            }}>距离:{3}km</Text>
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
                                fontSize: 20,
                                padding: 15,
                            }}>联系商家</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#d11", }}
                        activeOpacity={0.8}
                        onPress={() => this.onClicks("buy")}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                alignSelf: "center",
                                color: '#FFF',
                                fontSize: 20,
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
        }
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