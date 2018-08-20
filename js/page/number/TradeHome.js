import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Clipboard,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    AppRegistry,
    Platform,
    View,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width, window_height } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from "../../util/HttpUtils";
import BaseUrl from "../../util/BaseUrl";
import RefreshFlatList2 from "../../common/RefreshFlatList2"
import DialogUtils from '../../util/DialogUtils';
import Colors from "../../util/Colors"
import {Overlay, Label} from 'teaset';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const { width } = Dimensions.get('window');
import SplashScreen from "react-native-splash-screen"


//Wepay交易

export default class TradeHome extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            wepayNum: "0.00", //Wepay资产
            yueNum: "0.00", //余额
            echartsType: 0,  //0：5分钟 ， 1：5小时 ，2：日线 
            activeIndex: 0,//0余额购买 ，1余额出售
        }
    }

    componentDidMount() {
        SplashScreen.hide();
        this._refreshData()
    }

    render() {

        let { activeIndex } = this.state;

        // 指定图表的配置项和数据
        var option = {
            //点击某一个点的数据的时候，显示出悬浮窗
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            color: ["#d15"],
            series: [{
                name: '苹果',
                data: [20, 30, 6, 24, 40, 60, 67],
                type: 'line',
                areaStyle: { color: "#d15", origin: "auto" }
            }]
        };

        return (
            <View style={styles.container}>
                
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",
                     backgroundColor: Colors.mainColor, height: 45,marginTop:Platform.OS === "ios" ? 20 : 0
                }}>
                    <TouchableOpacity
                        style={[{ paddingRight: 20, paddingTop: 10, paddingBottom: 10 ,position:"absolute",left:10},]}
                        onPress={() =>this.props.navigation.goBack(null)} >
                        <Image source={require('../../../res/images/fanhui.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    ref={title=>this.title=title}
                    onPress={() => this.showPopover(this.title)} 
                    >
                    <View style={{alignItems:"center"}}> 
                      <Text style={{fontSize:18,color:Colors.white,marginBottom:3}}>Wepay</Text>
                      <Image  source={require("../../../res/images/sanjiao.png")} />
                    </View></TouchableOpacity>
                    
                </View>
                <ScrollView>
                    <View style={{ backgroundColor: Colors.bgColor }}>

                        {/* 顶部布局  资产  余额*/}
                        <View style={[{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
                            padding: 10, backgroundColor: mainColor
                        }]}>
                            <TouchableOpacity
                                activeOpacity={0.8} >
                                <View style={{ flexDirection: 'column', alignItems: "center", width: width / 2 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>Wepay资产</Text>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>{this.state.wepayNum}</Text>
                                </View></TouchableOpacity>
                            <View style={{ height: 30, width: 0.5, backgroundColor: '#fff' }} />
                            <TouchableOpacity activeOpacity={0.8}>
                                <View style={{ flexDirection: 'column', alignItems: "center", width: width / 2 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>余  额</Text>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>{this.state.yueNum}</Text>
                                </View></TouchableOpacity>
                        </View>
                        <View style={{ padding: 15, flexDirection: "row", backgroundColor: Colors.white }}>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, color: Colors.text8, }}>当前价格</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, }}>53.2121</Text>
                            </View>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, color: Colors.text8, }}>高</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, }}>53.2121</Text>
                            </View>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, color: Colors.text8, }}>低</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, }}>53.2121</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 15, paddingBottom: 15, backgroundColor: Colors.white, marginTop: 1 }}>

                            <TouchableOpacity onPress={() => this.onClick(0)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require("../../../res/images/fabuchushou.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 0 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>发布出售订单</Text>
                                </View></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClick(1)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require("../../../res/images/fabugoumai.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 1 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>发布购买订单</Text>
                                </View></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClick(2)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center", }}>
                                    <Image source={require("../../../res/images/dingdan-shu.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 2 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>订单</Text>
                                </View></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClick(2)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center", }}>
                                    <Image source={require("../../../res/images/jiaoyijilu-shu.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 2 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>交易记录</Text>
                                </View></TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: Colors.bgColor, height: 10 }} />
                        {/* 折线统计图 */}
                        <View style={{ flexDirection: "row", backgroundColor: Colors.white }}>
                            <Text style={{
                                borderColor: Colors.blue1, flex: 1, padding: 10, textAlign: "center", borderWidth: 0.5,
                                backgroundColor: this.state.echartsType === 0 ? Colors.blue1 : Colors.white,
                                color: this.state.echartsType !== 0 ? Colors.blue1 : Colors.white
                            }}
                                onPress={() => this.magicType(0)}
                            >5分钟</Text>
                            <Text style={{
                                borderColor: Colors.blue1, flex: 1, padding: 10, textAlign: "center", borderWidth: 0.5,
                                backgroundColor: this.state.echartsType === 1 ? Colors.blue1 : Colors.white,
                                color: this.state.echartsType !== 1 ? Colors.blue1 : Colors.white
                            }}
                                onPress={() => this.magicType(1)}
                            >5小时</Text>
                            <Text style={{
                                borderColor: Colors.blue1, flex: 1, padding: 10, textAlign: "center", borderWidth: 0.5,
                                backgroundColor: this.state.echartsType === 2 ? Colors.blue1 : Colors.white,
                                color: this.state.echartsType !== 2 ? Colors.blue1 : Colors.white
                            }}
                                onPress={() => this.magicType(2)}
                            >日线</Text>
                        </View>
                        {/* 折线统计图 */}
                        <View style={{ marginTop: -50, zIndex: -1, backgroundColor: Colors.white }}>
                            <Echarts option={option} height={240} width={width} />
                        </View>

                        <View style={{ flexDirection: "row", backgroundColor: Colors.bgColor, justifyContent: "center", padding: 10, marginTop: -30 }}>
                            <TouchableOpacity
                                onPress={() => this.selectIndex(0)}
                                style={{
                                    borderColor: Colors.r1, borderWidth: 1, borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
                                    justifyContent: "center", alignItems: "center", backgroundColor: activeIndex ? Colors.white : Colors.red
                                }}>
                                <Text style={{ padding: 8, fontSize: 16, marginLeft: 25, marginRight: 10, color: activeIndex ? Colors.red : Colors.white }}>购买记录</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.selectIndex(1)}
                                style={{
                                    borderColor: Colors.r1, borderWidth: 1, borderTopRightRadius: 18, borderBottomRightRadius: 18,
                                    justifyContent: "center", alignItems: "center", backgroundColor: activeIndex ? Colors.red : Colors.white
                                }} >
                                <Text style={{ padding: 8, fontSize: 16, marginLeft: 25, marginRight: 10, color: activeIndex ? Colors.white : Colors.red }}>释放记录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: Colors.white }}>
                            <RefreshFlatList2
                                ref={refList => this.refList = refList}
                                renderItem={(items) => this._getItem(items)}
                                onRefreshs={() => this._refreshData()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    //选择折线图类型
    magicType(i) {
        //alert(i)
        this.setState({ echartsType: i })
    }
    onClick(i) {
        this.action = i
        this.props.navigation.navigate('EchartsDemo');
    }
    selectIndex(index) {
        this.setState({ activeIndex: index })
        this.activeIndex = index;
    }

    /**
     * 绘制itemView
     * @param data
     * @returns {*}
     * @private
     */
    _getItem(data) {
        return <View style={{ flex: 1 }}>
            <Text style={{ padding: 15, fontSize: 15, color: Colors.black }}>{this.state.activeIndex ? "购买" : "出售"}</Text>
        </View>
    }
    //刷新数据
    _refreshData() {
        var data = []
        for (const i = 0; i < 15; i++) {
            data.push("武平" + i)
        }
        this.refList.setData(data)
    }
    /**
     * onPress={() => this.showPopover(this.refs['downcenter'], 'down', 'center')} 
     * @param {*} view 
     * @param {*} direction 
     * @param {*} align 
     */
    showPopover(view) {
        let {black, shadow, showArrow} = this.state;
        let blackStyle = {
        //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
        //   paddingTop: 8,
        //   paddingBottom: 8,
        //   paddingLeft: 12,
        //   paddingRight: 12,
        };
        let whiteStyle = {
          ...blackStyle,
          backgroundColor: Colors.black,
        };
        let shadowStyle = {
          shadowColor: '#777',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 2,
        };
        let popoverStyle = [].concat(black ? blackStyle : whiteStyle).concat(shadow ? shadowStyle : null);
        var bi = []

        view.measure((x, y, width, height, pageX, pageY) => {
          let fromBounds = {x: pageX, y: pageY, width, height};
          let overlayView = (
            <Overlay.PopoverView popoverStyle={popoverStyle} fromBounds={fromBounds} direction={"down"} align={"center"} directionInsets={4} showArrow={showArrow}>
              <View>
                  <Text style={{fontSize:15,color:Colors.white,paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10}}>
                  Wepay资产</Text>  
                  <View style={{backgroundColor:Colors.white,height:0.5}}/>
                  <Text style={{fontSize:15,color:Colors.white,paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10}}>
                  Wepay资产</Text>  
              </View>
            </Overlay.PopoverView>
          );
          Overlay.show(overlayView);
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
    container: {
        flex: 1,
    },

    titleView: {
        height: Platform.OS == 'ios' ? 64 : 44,
        paddingTop: Platform.OS == 'ios' ? 14 : 0,
        backgroundColor: '#ff6400',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

});