import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AutoGrowingTextInput from '../../common/AutoGrowingTextInput';
import NavigationBar from "../../common/NavigationBar";
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import { rethrow } from 'rsvp';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';

/**
 * 投诉建议
 */
const width_w = Utils.getWidth()/4-20;
export default class Complaint extends BaseComponent {
    width_w = Utils.getWidth()/4-20;
    constructor(props) {
        super(props);
        this.state = {
            text: '其输入您的意见',
            photos:[],
        }
        this.navigation = this.props.navigation;
    }

    

    /**
     * 选择图片后回调此函数
     */
    handleOpenImagePicker = () => {
        SYImagePicker.showImagePicker({imageCount: 9, isRecordSelected: true}, (err, photos) => {
            console.log(err, photos);
            if (!err) {
                this.setState({
                    photos:photos,
                })
            }
        })
    };
    /**
     * 创建ImagView 显示图片
     * @param {*} photos 
     */
    createImg(photos){
       return photos.map((photo, index) => {
            let source = { uri: photo.uri };
            if (photo.enableBase64) {
                source = { uri: photo.base64 };
            }
            return (
                <Image
                    key={`image-${index}`}
                    style={{width:width_w,
                           height:width_w,
                           marginLeft:index===0?0:10
                        }}
                    source={source}
                    resizeMode={"contain"}
                />
            )
        })

    }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='投诉建议'
                    navigation={this.props.navigation}
                />
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: "#fff" }}>
                    <Text style={{
                        alignSelf: "center",
                        color: '#d11',
                        fontSize: 16,
                    }}>请在下方输入您的宝贵意见</Text>
                    <Text style={{
                        alignSelf: "center",
                        color: '#999',
                        fontSize: 12,
                    }}> (图片仅限3张内)</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', backgroundColor: "#e1e1e1" }} /> */}
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: "#fff",
                    marginTop: 8
                }]}>
                    <AutoGrowingTextInput
                        style={{ flex: 1, fontSize: 16, color: '#333', textAlignVertical: 'top' }}
                        placeholder={'最多155个汉字内容'}
                        multiline={true}
                        maxLength={155}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ text: text })}
                    />
                </View>
               <TouchableOpacity onPress={()=>this.handleOpenImagePicker()}>
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: "#fff",marginTop:10 }}>
                    {this.createImg(this.state.photos)}
                    <Image style={{
                        alignSelf: "center",
                        width:60,height: 60,
                    }}
                    source={require("../../../res/images/new.png")}
                    />
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        height: 45,
                        marginTop: 40,
                        marginLeft: 15,
                        marginRight: 15,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: mainColor,
                    }}
                    onPress={() => this.onClicks()}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }
    onClicks() {
        //this.props.navigation.goBack()
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