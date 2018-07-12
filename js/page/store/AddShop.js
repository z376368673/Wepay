import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import AutoGrowingTextInput from '../../common/AutoGrowingTextInput';
import NavigationBar from "../../common/NavigationBar";
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import { PullPicker } from 'teaset';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';
import DialogUtils from '../../util/DialogUtils';

/**
 * 添加商品
 */
const width_w = Utils.getWidth() / 2 - 20;
export default class AddShop extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            shopName:null,
            shopPrice:0,
            shopNum:0,
            shopImage: require("../../../res/images/addimg.png"),
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
                this.setState({shopImage:source}, )
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
                    title={"添加商品"}
                    navigation={this.props.navigation}
                />
                <ScrollView >
                    <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                商品名称</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                placeholder={'请输入商品名称'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"default"}
                                maxLength={12}
                                onChangeText={(text) => this.setState({ shopName: text })} />
                        </View>

                         <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                商品价格</Text>
                            <TextInput
                                style={[styles.itemTextInput,{width:60}]}
                                placeholder={'请输入价格'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"default"}
                                maxLength={12}
                                onChangeText={(text) => this.setState({ shopPrice: text })} />
                                <Text style={[styles.itemText,{marginLeft:10}]}>
                                元</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                库存数量</Text>
                            <TextInput
                                style={[styles.itemTextInput,{width:60}]}
                                placeholder={'请输入库存数量'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"numeric"}
                                maxLength={12}
                                onChangeText={(text) => this.setState({ shopNum: text })} />
                                 <Text style={[styles.itemText,{marginLeft:10}]}>
                                件</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10}}>
                            <Text style={{
                                alignSelf: "center",
                                color: '#333',
                                fontSize: 14,
                            }}>*请点击下图上传商品图片</Text>
                        </View>
                        <View style={[styles.itemView,{flex:1}]}>
                        <TouchableOpacity
                         onPress={() => this.handleAsyncSelectPhoto(false, false)}
                        ><Image
                         style={{flex:1,width:200,height:140,backgroundColor:"#fff"}}
                         source={this.state.shopImage}
                        />></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                height: 45,
                                marginTop: 30,
                                marginLeft: 15,
                                marginRight: 15,
                                marginBottom: 50,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: mainColor,
                            }}
                            onPress={() => this.onClicks("add")}
                            >
                            <Text style={{
                                alignSelf: "center",
                                color: '#FFF',
                                fontSize: 20,
                            }}>确认添加</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
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
        height: 35, flex: 1, fontSize: 16, color: '#333',backgroundColor: "#fff",padding:5,
        borderWidth: 0.5,borderColor: "#ccc",
    }
});