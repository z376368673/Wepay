import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import Utils from '../util/Utils';
import { mainColor } from '../page/BaseComponent';

//未完成订单中，大概分为3个阶段， (刚发布)未选择打款人 ，  (有人购买你的或者卖你的)未选择打款人没有下拉，已选择打款人 和确认打款人点击下拉有银行卡信息 
/** 未选择打款人 ，  (刚发布)
 *  已选择打款人,    (有人购买你的或者卖你的) 
 *  确认打款人       (对方已付款等待你的确认，或者你已经付款，等待别人确认，)
 *  已完成确认就是完成订单的信息了，
 * 
 *  type 表示     0，买入  1， 卖出    
 * 
 *  orderType    1，未完成订单， 2，确定打款订单  3 已完成订单
 *  这个界面支持 orderType = 2，3
 * 
 */
export default class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnim: new Animated.Value(0),
            rotate: "90deg"
        };
        this.showorhide = 0;

        this.type = this.props.type ? this.props.type : 0
        this.orderType = this.props.orderType ? this.props.orderType : 1
    }

    _showorhideItems() {
        //alert(JSON.stringify(this.state.data))
        //alert(this.getOrderState(this.state.data.payState))
        if (this.props.data.payState !== 0) {
            Animated.timing(          // Uses easing functions
                this.state.showAnim,    // The value to drive
                {
                    toValue: this.showorhide == 0 ? 1 : 0
                }            // Configuration
            ).start();
            this.showorhide = this.showorhide == 0 ? 1 : 0;
        }
    }
    //点击旋转图片 
    _onPress(type) {
        var rotate = "90deg"
        rotate = this.state.rotate === rotate ? "270deg" : "90deg"
        this.setState({
            rotate: rotate,
            defaultImage:require("../../res/images/addimg.png"),
        })
        this._showorhideItems()
    }
    /**
     * 根据订单状态获取相应的值
     * 订单状态:0->默认上架,1->有人买入,2->已打款,3->确认到款(已完成)
     * @param {*} state 
     */
    getOrderState(state) {
        var stateText = "未选择打款人";
        switch (state) {
            case 0:
                break;
            case 1:
                stateText = "已选择打款人";
                break;
            case 2:
                stateText = "已打款";
                break;
            case 3:
                stateText = "确认到款";
                break;
            default:
                stateText = "未选择打款人";
                break
        }
        return stateText;
    }
    //确认按钮点击事件  一种是上传打款图片接口  一个确认订单接口
    confirmButton(){
        if(this.props.data.payState===2){

        }else if(this.props.data.payState===3){

        }
    }
    
    render() {
        let backgroundColor = "#f8f8f8"
        //取消订单按钮
        let cancleOrder = <TouchableOpacity
            style={{
                marginTop: 10, borderColor: "#d11", borderRadius: 8, borderWidth: 1,
                width: 100, height: 30, alignItems: "center", justifyContent: "center",
            }} >
            <Text style={{ fontSize: 14, color: "#d11", textAlign: "center" }} >取消订单</Text>
        </TouchableOpacity>

        let addImage = <TouchableOpacity >
            <Image style={{ width: 140, height: 140 ,borderWidth:0.5,borderColor:"#999",marginTop:10}} source={this.state.defaultImage} />
        </TouchableOpacity>

        //确认按钮
        let confirmOrder = <TouchableOpacity
            onPress={()=>this.confirmButton()}
            style={{
                marginTop: 10, borderRadius: 15, backgroundColor: mainColor,
                width: 100, height: 30, alignItems: "center", justifyContent: "center",
                alignSelf:"flex-end"
            }} >
            <Text style={{ fontSize: 14, color: "#fff", textAlign: "center" }} >确认收款</Text>
        </TouchableOpacity>

        //隐藏布局 -imageview
        let imageView = <View style={{ flexDirection: "column" ,backgroundColor:backgroundColor,}}>
         <View style={{ backgroundColor: "#c1c1c1", height: 2, marginBottom:10}}/>
            <Text style={Styles.text}>打款截图:</Text>
             <View style={{ flexDirection: "row" ,backgroundColor:backgroundColor}}>
             {addImage} <View style={{flex:1}}></View>{confirmOrder}
            </View> 
        </View>
        return (
            <View style={{ flexDirection: "column", marginBottom: 5, }}>
                <View style={{ backgroundColor: "#fff", flexDirection: "column", padding: 12, flex: 1, }}>

                    <TouchableOpacity activeOpacity={0.9}
                        onPress={() => this._onPress(this.props.data.payState)}>
                        <View style={{ flexDirection: 'row', }}>

                            <Text style={{ flex: 1, color: "#333333", fontSize: 18, }}>挂单金额:{this.props.data.payNums}RMB</Text>

                            <Text style={{
                                color: "#2828FF", marginTop: 5, fontSize: 15,
                            }}>{this.getOrderState(this.props.data.payState)}</Text>
                            <Image style={{ transform: [{ rotate: this.state.rotate }] }} source={require("../../res/images/ic_tiaozhuan.png")} />

                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', }}>           
                    <Text style={{ color: "#666666", fontSize: 14, marginTop: 10,flex:1 }}>
                        {Utils.formatDateTime(this.props.data.payTime * 1000)}
                    </Text>
                    <Text style={{ color: "#666666",  fontSize: 14, marginTop: 10, marginRight: 10,}}>
                        打款人： {this.props.data.userName}
                    </Text>
                   </View>             
                    {this.props.data.payState === 2 ? null : cancleOrder}
                </View>
                <Animated.View
                    style={{
                        height: this.state.showAnim.interpolate({
                            inputRange: [0, 1], outputRange: [0, 360]
                        }),
                        overflow: 'hidden'
                    }}
                >
                    <View style={{
                        justifyContent: 'center', backgroundColor: backgroundColor, padding: 12,
                    }}>
                        <View style={Styles.view}>
                            <Text style={Styles.text}>姓名:</Text>
                            <Text style={Styles.textValue}>{this.props.data.userName}</Text>
                        </View>

                        <View style={{ backgroundColor: "#c1c1c1", height: 0.5 }}></View>

                        <View style={Styles.view}>
                            <Text style={Styles.text}>手机号码:</Text>
                            <Text style={Styles.textValue}>{this.props.data.mobile}</Text>
                        </View>

                        <View style={{ backgroundColor: "#c1c1c1", height: 0.5 }}></View>

                        <View style={Styles.view}>
                            <Text style={Styles.text}>交易金额:</Text>
                            <Text style={Styles.textValue}>{this.props.data.payNums}</Text>
                        </View>

                        <View style={{ backgroundColor: "#c1c1c1", height: 0.5 }}></View>

                        <View style={Styles.view}>
                            <Text style={Styles.text}>状态:</Text>
                            <Text style={[Styles.textValue, { color: "#2828FF" }]}>{this.getOrderState(this.props.data.payState)}</Text>
                        </View>
                    
                        {this.props.data.payState === 2 ? imageView : null}
                    </View>
                </Animated.View>
            </View>
        );
    }
}
export const Styles = StyleSheet.create({

    view: {
        height: 40, flexDirection: "row", alignItems: "center"
    },
    text: {
        // padding:10,
        fontSize: 15, color: "#666"
    },
    textValue: {
        flex: 1, fontSize: 15, color: "#333", textAlign: "right",
    }
});