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
import {BaseStyles, window_width} from "../page/BaseComponent";

export default class ViewUtils {
    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    // static getSettingItem(callBack, icon, text, tintStyle, expandableIco) {
    //     return (
    //         <TouchableHighlight
    //             onPress={callBack}>
    //             <View style={[styles.setting_item_container]}>
    //                 <View style={{alignItems: 'center', flexDirection: 'row'}}>
    //                     {icon ?
    //                         <Image source={icon} resizeMode='stretch'
    //                                style={[{opacity: 1, width: 16, height: 16, marginRight: 10,}, tintStyle]}/> :
    //                         <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
    //                     }
    //                     <Text>{text}</Text>
    //                 </View>
    //                 <Image source={expandableIco ? expandableIco : require('../../res/images/ic_tiaozhuan.png')}
    //                        style={[{
    //                            marginRight: 10,
    //                            height: 22,
    //                            width: 22,
    //                            alignSelf: 'center',
    //                            opacity: 1
    //                        }, tintStyle]}/>
    //             </View>
    //         </TouchableHighlight>
    //     )
    // }

    // static getLeftButton(callBack) {
    //     return <TouchableOpacity
    //         style={{padding: 8}}
    //         onPress={callBack}>
    //         <Image
    //             style={{width: 26, height: 26,}}
    //             source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
    //     </TouchableOpacity>
    // }

    // static getRightButton(title, callBack) {
    //     return <TouchableOpacity
    //         style={{alignItems: 'center',}}
    //         onPress={callBack}>
    //         <View style={{marginRight: 10}}>
    //             <Text style={{fontSize: 20, color: '#FFFFFF',}}>{title}</Text>
    //         </View>
    //     </TouchableOpacity>
    // }

    /**
     * 获取更多按钮
     * @param callBack
     * @returns {XML}
     */
    // static getMoreButton(callBack) {
    //     return <TouchableHighlight
    //         underlayColor={'transparent'}
    //         ref="moreMenuButton"
    //         style={{padding: 5}}
    //         onPress={callBack}
    //     >
    //         <View style={{paddingRight: 8}}>
    //             <Image
    //                 style={{width: 24, height: 24,}}
    //                 source={require('../../res/images/ic_more_vert_white_48pt.png')}
    //             />
    //         </View>
    //     </TouchableHighlight>
    // }

    /**
     * 获取分享按钮
     * @param callBack
     * @returns {XML}
     */
    // static getShareButton(callBack) {
    //     return <TouchableHighlight
    //         underlayColor={'transparent'}
    //         onPress={callBack}
    //     >
    //         <Image
    //             style={{width: 20, height: 20,opacity:0.9,marginRight:10,tintColor:'white'}}
    //             source={require('../../res/images/ic_share.png')}/>
    //     </TouchableHighlight>
    // }
    static getLineView(lineHeight, color) {
        lineHeight = lineHeight ? lineHeight : 1.5;
        color = color ? color : '#f0f0f0';
        return <View style={{
            backgroundColor: color,
            height: lineHeight,
            flexDirection: 'column',
            marginLeft: 15,
            marginRight: 15
        }}/>

    }

    static getSettingItem(img, text, text2, callback) {
        return <TouchableOpacity
            onPress={callback}
        >
            <View style={[BaseStyles.container_center,
                {flexDirection: 'row', backgroundColor: "#fff", padding: 10}]}>
                <Image source={img}
                       style={{
                           width: 40,
                           height: 40,
                           borderRadius: 20,
                           marginLeft: 10
                       }}/>
                <Text style={{color: "#333", fontSize: 16, marginLeft: 10, flex: 1}}>{text} </Text>
                <Text style={{color: "#888", fontSize: 16,}}>{text2}</Text>
                <Image source={require('../../res/images/ic_tiaozhuan.png')}
                       style={{
                           width: 30,
                           height: 30,
                           tintColor: "#888"
                       }}/>
            </View>
        </TouchableOpacity>
    }


    static getSettingItem1(img, text, isShow, callback) {
        //公告和个人消息里的红点，
        let dian = isShow ? <View style={{width: 10, height: 10, tintColor: "#d15"}}/> : null;
        return <TouchableOpacity
            onPress={callback}
        >
            <View style={[BaseStyles.container_center,
                {flexDirection: 'row', backgroundColor: "#fff", padding: 10}]}>
                <Image source={img}
                       style={{
                           width: 40,
                           height: 40,
                           borderRadius: 20,
                           marginLeft: 10
                       }}/>
                <Text style={{color: "#333", fontSize: 16, marginLeft: 10, flex: 1}}>{text} </Text>
                {dian}
                <Image source={require('../../res/images/ic_tiaozhuan.png')}

                       style={{
                           width: 30,
                           height: 30,
                           tintColor: "#888"
                       }}/>
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
                style={{width: width, height: width / 4 * 3, marginLeft: 5}}
                source={require('../../res/images/xin.png')}
            />)
        }
        let view = <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: "#fff", fontSize: fontSize,}}>信用: </Text>
            {views}
        </View>
        return view;
    }



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