import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor } from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import { QRScannerView } from 'ac-qrcode';
import DialogUtils from '../util/DialogUtils';

export default class SaoSaoView extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            < QRScannerView
                isCornerOffset={true}
                cornerBorderLength={24}
                cornerBorderWidth={4}
                cornerOffsetSize={4}
                rectWidth={280}
                rectHeight={280}
                hintText={'请将扫描框对准二维码'}
                hintTextStyle={{ color: "#fff", fontSize: 16, }}
                hintTextPosition={80}
                maskColor={"#00000080"}
                bottomMenuHeight={100}
                bottomMenuStyle={{ backgroundColor: '#00000080', height: 100, justifyContent: 'center' }}
                scanBarColor={"#d11"}
                scanBarMargin={10}
                scanBarAnimateTime={3000}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{zIndex: 1}}
                            onPress={() => this.props.navigation.goBack()}>
                            <NavigationBar
                                title='扫一扫'
                                navigation={this.props.navigation}
                                style={{ backgroundColor: mainColor, }}
                                statusBar={{
                                    statusBar: 'light-content',
                                    hide: false,
                                    translucent: false,
                                    backgroundColor: mainColor,
                                }}
                            /></TouchableOpacity>
                    )
                }}

                renderBottomMenuView={() => {
                    return (
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {/* //暂时无法做到扫描相册的二维码 */}
                            {/* <Text style={{fontSize:22,color:"#fff",padding:30}}
                            >打开相册</Text> */}
                        </View>
                    )
                }}
            />

        );
    }
    onClicks(type) {

    }

    zIndex = 0;
    barcodeReceived(e) {
        this.zIndex += 1;
        if (this.zIndex === 1) {
            DialogUtils.showToast("扫描成功" + this.zIndex + JSON.stringify(e))
            this.props.navigation.goBack();
            this.props.navigation.navigate('ZhuanChuNext', {
                account: e.data,
            })
            this.zIndex = 0
        }
    }
}
export const Styles = StyleSheet.create({
    image_qqbrowser_light: {
        height: 30,
        width: 30,
    },

    view_title_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000000B3',
        height: 56,
        alignItems: 'center',
    }
})