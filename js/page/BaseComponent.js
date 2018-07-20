import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import DialogUtils from "../util/DialogUtils"
import AsySorUtils from '../dao/AsySorUtils';
import { inject } from 'mobx-react';
import user from '../model/UserInfo';
import { PullPicker } from 'teaset';
export default class BaseComponent extends Component {
    
    constructor(props) {
        super(props);
       // this.navigation = this.props.navigation;
       //this.props.navigation.navigate('name');
       // this.props.navigation.goBack()
    }
 
    getUser(){
        return  user;
    }
    //获取用户信息
     getUserInfo(){
        if(user.userInfo===null){
            //下面的方法不同步 很烦 正在找方法
            return  this.userInfo =async()=> await JSON.parse(AsyncStorage.getItem('userInfo'))
        } 
        return  user.userInfo;
    }
     //获取用户信息 sessionId
    getSessionId(){
        return  user.sessionId;
    }
    getCallBackValue = (params) => this.setState(params)
    //获取图片拼接的地址，有些图片不需要拼接
    getImgUrl(){
        return "http://tz.hxksky.com/wepay/upload/"
    }
}
const { height, width } = Dimensions.get('window');
export const mainColor = '#48b1a3';
export const window_height = height;
export const window_width = width;

export const BaseStyles = StyleSheet.create({
    container_center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position:"absolute",  //绝对布局
    },
    container_row: {
        flex: 1,
        flexDirection: 'row',
    },
    container_column: {
        flex: 1,
        flexDirection: 'column',
    },

});
/*
flexWrap enum('wrap', 'nowrap')

flexDirection enum('row', 'column','row-reverse','column-reverse')
row: 从左向右依次排列
row-reverse: 从右向左依次排列
column(default): 默认的排列方式，从上向下排列
column-reverse: 从下向上排列

justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
space-around 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半


alignItems enum('flex-start', 'flex-end', 'center', 'stretch')
stretch 弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度。

子视图属性
alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')
stretch 元素被拉伸以适应容器。
center 元素位于容器的中心。
flex-start 元素位于容器的开头。
flex-end 元素位于容器的结尾。

position enum('absolute', 'relative')属性设置元素的定位方式，为将要定位的元素定义定位规则。
absolute：生成绝对定位的元素，元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
relative：生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
*/
