import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    View,
} from 'react-native';
import BaseComponent, { mainColor } from "../BaseComponent";
import RefreshFlatList2 from "../../common/RefreshFlatList2"
import Colors from "../../util/Colors"
import { Overlay } from 'teaset';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const { width } = Dimensions.get('window');
import SplashScreen from "react-native-splash-screen"


//Wepay交易

export default class TradeHome extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            cid:1,  //1.Wepay 2.比特币 3.莱特币  4.以太坊  5.狗狗币
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

                <View style={{
                    flexDirection: "row", justifyContent: "center", alignItems: "center",
                    backgroundColor: Colors.mainColor, height: 45, marginTop: Platform.OS === "ios" ? 20 : 0
                }}>
                    <TouchableOpacity
                        style={[{ paddingRight: 20, paddingTop: 10, paddingBottom: 10, position: "absolute", left: 10 },]}
                        onPress={() => this.props.navigation.goBack(null)} >
                        <Image source={require('../../../res/images/fanhui.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        ref={title => this.title = title}
                        onPress={() => this.showPopover(this.title)}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 18, color: Colors.white, marginBottom: 3 }}>Wepay</Text>
                            <Image source={require("../../../res/images/sanjiao.png")} />
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

                            <TouchableOpacity onPress={() => this.onClick(1)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require("../../../res/images/fabuchushou.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 0 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>发布出售订单</Text>
                                </View></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClick(2)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require("../../../res/images/fabugoumai.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 1 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>发布购买订单</Text>
                                </View></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClick(3)} style={{ flex: 1 }}>
                                <View style={{ alignItems: "center", justifyContent: "center", }}>
                                    <Image source={require("../../../res/images/dingdan-shu.png")} style={{ height: 40, width: 40, }} />
                                    <Text style={{ color: this.state.selectIndex === 2 ? Colors.mainColor : Colors.text6, fontSize: 13, marginTop: 5 }}>订单</Text>
                                </View></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClick(4)} style={{ flex: 1 }}>
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
                        <View style={{ backgroundColor: Colors.bgColor }}>
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
    onClick(i) {
        this.action = i
        switch (i) {
            case 1:
            case 2:
                this.props.navigation.navigate('CreateBSOrder', {
                    cid: this.state.cid,
                    type: i,
                });
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }
    //选择折线图类型
    magicType(i) {
        //alert(i)
        this.setState({ echartsType: i })
    }
    //购买 出售 订单
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
        // return <View style={{ flex: 1 }}>
        //     <Text style={{ padding: 15, fontSize: 15, color: Colors.black }}>{this.state.activeIndex ? "购买" : "出售"}</Text>
        // </View>
        return <TouchableOpacity >
            <View
                key={data.item.index}
                style={{
                    backgroundColor: '#fff', alignItems: 'center',
                    justifyContent: "center", marginBottom: 1,
                    flexDirection: 'row', padding: 10,
                }}>
                <Image
                    style={{ width: 45, height: 45, borderWidth: 1, borderRadius: 23, borderColor: "#666" }}
                    // source={{uri:imgPath}} 
                    source={require("../../../res/images/touxiang-xiao.png")}
                />

                <View style={{ flexDirection: 'column', justifyContent: "center", flex: 1, marginLeft: 10, marginRight: 10 }}>
                    <Text
                        style={{ color: "#333333", fontSize: 16 }}>{"usernamsssss"}</Text>

                    <Text style={{ color: "#888", fontSize: 14, marginTop: 5 }}
                        numberOfLines={1}
                    >限 额:{1213.23}</Text>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: "center", marginLeft: 10, marginRight: 10 }}>
                    <Text
                        style={{ color: Colors.blue, fontSize: 16, textAlign: "right" }}>{45.3121}</Text>
                    <Text style={{
                        paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, color: Colors.r1,
                        fontSize: 13, textAlign: "center", borderWidth: 1, borderColor: Colors.r1, borderRadius: 10
                    }} numberOfLines={1}>{this.state.activeIndex ? "购买" : "出售"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
    //刷新数据
    _refreshData(cid) {
        var data = []
        for (const i = 0; i < 15; i++) {
            data.push("武平" + i)
        }
        this.refList.setData(data)
    }
    //选择币种  cid 各种货币id
    //1.Wepay 2.比特币 3.莱特币  4.以太坊  5.狗狗币
    selectCid(cid){
        this.setState({cid:cid})
        this._refreshData(cid)
    }
    /**
     * onPress={() => this.showPopover(this.refs['downcenter'], 'down', 'center')} 
     * @param {*} view 
     * @param {*} direction 
     * @param {*} align 
     */
    showPopover(view) {
        let { black, shadow, showArrow } = this.state;
        let blackStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            //   paddingTop: 1,
            //   paddingBottom: 1,
            paddingLeft: 12,
            paddingRight: 12,
        };
        let whiteStyle = {
            ...blackStyle,
            backgroundColor: Colors.bgColor,
        };
        let shadowStyle = {
            shadowColor: '#777',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
        };
        let popoverStyle = [].concat(black ? blackStyle : whiteStyle).concat(shadow ? shadowStyle : null);

        view.measure((x, y, width, height, pageX, pageY) => {
            let fromBounds = { x: pageX, y: pageY, width, height };
            let overlayView = (
                <Overlay.PopoverView popoverStyle={popoverStyle}
                    fromBounds={fromBounds} direction={"down"} align={"center"}
                    directionInsets={4} showArrow={showArrow}
                    ref={v => this.view = v}>
                    <View>
                        <Text
                            onPress={() => {
                                this.view.close()
                                selectCid(1)
                            }}
                            style={{ fontSize: 14, color: Colors.black, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
                            Wepay</Text>
                        <View style={{ backgroundColor: Colors.black, height: 0.5 }} />
                        <Text
                            onPress={() => {
                                this.view.close()
                                selectCid(2)
                            }}
                            style={{ fontSize: 14, color: Colors.text3, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
                            比特币</Text>
                        <View style={{ backgroundColor: Colors.black, height: 0.5 }} />
                        <Text
                            onPress={() => {
                                this.view.close()
                                selectCid(3)
                            }}
                            style={{ fontSize: 14, color: Colors.text3, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
                            莱特币</Text>
                        <View style={{ backgroundColor: Colors.black, height: 0.5 }} />
                        <Text
                            onPress={() => {
                                this.view.close()
                                selectCid(4)
                            }}
                            style={{ fontSize: 14, color: Colors.text3, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
                            以太坊</Text>
                        <View style={{ backgroundColor: Colors.black, height: 0.5 }} />
                        <Text
                            onPress={() => {
                                this.view.close()
                                selectCid(5)
                            }}
                            style={{ fontSize: 14, color: Colors.text3, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}>
                            狗狗币</Text>
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