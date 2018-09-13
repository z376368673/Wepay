import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles } from "../page/BaseComponent";
import HttpUtils from "../util/HttpUtils";
import BaseUrl from '../util/BaseUrl';
import DialogUtils from '../util/DialogUtils';
import FastImage from 'react-native-fast-image'
import { Carousel ,Theme} from 'teaset';
import Colors from "../util/Colors";


//订单公用类（相当于Fragment）
const window_w = require('Dimensions').get('window').width;
export const KEYS = [""]
export default class ViewPager extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: this.props.data
        }
       // alert(this.props.data.length)
        Theme.carouselDotColor = "#999"
        Theme.carouselActiveDotColor = "#d11"
        this.userInfo = this.getUserInfo();
    }
    static defaultProps = {
        height: window_w / 3,//默认高度
        width: window_w,
        data:[],
        carousel:false,//是否轮播
        //itemView:(data,index)=>this.itemView(data,index),
        onChange:(index)=>{},
    }
    //界面加载完成
    componentDidMount() {

    }

    itemView(data,index){
      let view =  this.props.itemView?this.props.itemView:
        <TouchableOpacity key={index.toString()} onPress={() => { alert(data)}} activeOpacity={1}>
            <Image style={{ width:this.props.width, height: this.props.height }}
                   resizeMode='cover' source={data} />
        </TouchableOpacity>

        return view
    }

    createView() {
        var views = []
        let dataArray = this.props.data
        for ( var i = 0; i <dataArray.length; i++){
            var data = dataArray[i]
            views.push(this.itemView(data,i));
        }
        // this.state.dataArray.map((data, index) => {
        //     console.warn(data)
        //     views.push(this.props.itemView(data,index));
        // })
        return views;
    }

    render() {
        return (
                <Carousel
                    style={{ width: this.props.width, height: this.props.height }}
                    control={() => {
                        return <Carousel.Control
                            dot={()=>{
                                return <View style={{width:15,height:15,borderRadius:5,backgroundColor:Colors.text8}}/>
                            }}
                            activeDot={()=>{
                                return <View style={{width:15,height:15,borderRadius:5,backgroundColor:Colors.red}}/>
                            }}
                        /> }}
                    onChange={index => this.props.onChange(index)}
                >
                    {this.createView()}
                </Carousel>
        );
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