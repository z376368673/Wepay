import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import QRCode from "react-native-qrcode";
/**
 * 分享好友
 */

export default class SharePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: 'app下载地址'+"当前用户id",
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: mainColor}]}>
                <NavigationBar
                    title='分享好友'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('保存二维码', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.onClicks(0))}
                />
                <View style={{
                    height: 400,
                    alignItems: 'center',
                    marginStart: 55,
                    marginEnd: 55,
                    marginTop: 30,
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    borderRadius: 10,
                }}>
                    {/*生成二维码*/}
                    <View style={{marginTop: 40,}}>
                        <QRCode
                            value={this.state.text}
                            size={window_width / 2}
                            bgColor='black'
                            fgColor='white'/>
                    </View>

                    <View style={{flexDirection: 'row',}}>
                        <Image source={require("../../../res/images/yuandian.png")}
                               style={{flex: 1, height: 30, marginTop: 30, marginBottom: 40}}/>
                    </View>
                    <Text
                        style={{color: '#333', fontSize: 20,  zIndex: 1, bottom: 20}}>
                        扫一扫，向我付款</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>{this.onClicks(1)}}
                    style={{alignSelf: "center", position: "absolute", zIndex: 1, bottom: 95}}>
                    <Text style={{color: '#FFF', fontSize: 20, borderColor: "#fff", borderBottomWidth: 1,}}>
                        复制Wepay下载地址</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{this.onClicks(2)}}
                    style={{alignSelf: "center", position: "absolute", zIndex: 1, bottom: 50}}>
                    <Text style={{color: '#FFF', fontSize: 20,}}>分享记录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onClicks(type) {

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