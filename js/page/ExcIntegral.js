import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import QRCode from "react-native-qrcode";
import ViewUtils from "../util/ViewUtils";
//兑换积分

export default class ExcIntegral extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
            yue: 0,
            jifen: 0,
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='兑换积分'
                    navigation={this.props.navigation}
                    rightView={NavigationBar.getRightStyle_Text('兑换记录', {
                        fontSize: 16,
                        color: "#fff"
                    }, () => this.onClicks(1))}
                />

                {/* 余额积分布局*/}
                <View style={[ {
                    flexDirection:'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 10,
                    backgroundColor:mainColor
                }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.onClicks(2)}
                    >
                        <View style={{flexDirection: 'column',}}>
                            <Text style={{fontSize: 16, color: '#fff'}}>余额</Text>
                            <Text style={{fontSize: 16, color: '#fff'}}>￥{this.state.yue}</Text>
                        </View></TouchableOpacity>
                    <View style={{height: 30, width: 0.5, backgroundColor: '#fff'}}/>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.onClicks(3)}
                    >
                        <View style={{flexDirection: 'column',}}>
                            <Text style={{fontSize: 16, color: '#fff'}}>积分</Text>
                            <Text style={{fontSize: 16, color: '#fff'}}>￥{this.state.jifen}</Text>
                        </View></TouchableOpacity>
                </View>
                <Text style={[{
                    padding: 15,
                    backgroundColor: "#fff",
                    fontSize:16,
                    color:"#333",
                }]}>兑换成积分</Text>
                <View style={{backgroundColor:"#f0f0f0",height:2,}}/>
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: "#fff",
                }]}>
                    <Text style={{
                        color: '#333',
                        fontSize: 18,
                    }}> 余额      </Text>
                    <TextInput
                        style={{height: 40,flex:1,fontSize: 16,color:'#333',marginLeft:8}}
                        placeholder ={'请输入兑换金额'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({text})}
                        //失去焦点时
                        onBlur={()=>this.onClicks(4)}
                    />
                </View>

                <Text style={[{
                    color:"#666",
                    padding: 15,
                    fontSize:16,
                }]}>提示:最少兑换数量100，请输入100的整数倍</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        height:45,
                        marginTop:40,
                        marginLeft:15,
                        marginRight:15,
                        borderRadius:8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:mainColor,
                    }}
                    onPress={()=>this.onClicks(5)}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}> 确定兑换</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onClicks(index) {
        alert(index)
        switch (index) {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
          
            case 5:
                alert("卖出中心")
                break;
            default:
                break;
        }
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