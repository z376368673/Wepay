/**
 * ViewUtils
 * @flow
 **/
'use strict'

import React from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { BaseStyles, window_width, mainColor } from "../page/BaseComponent";
import { Theme, Overlay, Button } from 'teaset';
export default class ViewUtils {
    static getLineView(lineHeight, color) {
        lineHeight = lineHeight ? lineHeight : 1.5;
        color = color ? color : '#f0f0f0';
        return <View style={{
            backgroundColor: color,
            height: lineHeight,
            flexDirection: 'column',
            marginLeft: 15,
            marginRight: 15
        }} />

    }
    /**
     * 设置界面item
     * 
     * @param {*} img 
     * @param {*} text 
     * @param {*} text2 
     * @param {*} callback 
     */
    static getSettingItem(img, text, text2, callback) {
        return <TouchableOpacity
            onPress={callback}
        >
            <View style={[BaseStyles.container_center,
            { flexDirection: 'row', backgroundColor: "#fff", padding: 10 }]}>
                <Image source={img}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginLeft: 10
                    }} />
                <Text style={{ color: "#333", fontSize: 16, marginLeft: 10, flex: 1 }}>{text} </Text>
                <Text style={{ color: "#888", fontSize: 16, }}>{text2}</Text>
                <Image source={require('../../res/images/ic_tiaozhuan.png')}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: "#888"
                    }} />
            </View>
        </TouchableOpacity>
    }

    /**
    * 设置界面item2
    * 
    * @param {*} img 
    * @param {*} text 
    * @param {*} text2 
    * @param {*} callback 
    */
    static getSettingItem1(img, text, isShow, callback) {

        return <TouchableOpacity
            onPress={callback}
        >
            <View style={[BaseStyles.container_center,
            { flexDirection: 'row', backgroundColor: "#fff", padding: 10 }]}>
                <Image source={img}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginLeft: 10
                    }} />
                <Text style={{ color: "#333", fontSize: 16, marginLeft: 10, flex: 1 }}>{text} </Text>
                {/* //公告和个人消息里的红点，       */}
                {isShow ? <View style={{ backgroundColor: "#d11", width: 6, height: 6, borderRadius: 3 }}></View> : null}
                <Image source={require('../../res/images/ic_tiaozhuan.png')}

                    style={{
                        width: 30,
                        height: 30,
                        tintColor: "#888"
                    }} />
            </View>
        </TouchableOpacity>
    }


    /***
     * 信用
     *
     * @param value 信誉度
     * @param fontSize 信誉字体大小
     * @param width 信誉图片大小
     * @returns {*}
     */
    static getCreditView(value, fontSize, width) {
        var views = [];
        for (let i = 0; i < value; i++) {
            views.push(<Image
                key={i}
                style={{ width: width, height: width / 4 * 3, marginLeft: 5 }}
                source={require('../../res/images/xin.png')}
            />)
        }
        let view = <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: "#fff", fontSize: fontSize, }}>信用: </Text>
            {views}
        </View>
        return view;
    }

    // static showPassWordInput(onComplete) {
    //     let width = require('Dimensions').get('window').width
    //     let height = require('Dimensions').get('window').height
    //     let overlayView = (
    //         <Overlay.PullView side={'bottom'} modal={true} ref={v => this.overlayPullView = v}>
    //             <View style={{minWidth: width, minHeight: 100, justifyContent: 'center', alignItems: 'center' }}>
    //                <PassNumInput 
    //                 onClose={()=>this.overlayPullView?this.overlayPullView.close():null}
    //                 onComplete={pwd=>{
    //                     onComplete(pwd)
    //                 }}
    //                 onChangePassWord={(pwd,len)=>{}}
    //                />
    //             </View>
    //         </Overlay.PullView>
    //     );
    //     if(!overlayView.isShow)
    //     Overlay.show(overlayView);
    // }

}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})