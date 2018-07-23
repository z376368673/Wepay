import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";
import QRCode from "react-native-qrcode";


export default class ZhuanRu extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: "18629448593",
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: mainColor}]}>
                <NavigationBar
                    title='转入'
                    navigation={this.props.navigation}
                    // rightView={NavigationBar.getRightStyle_Text('保存二维码', {
                    //     fontSize: 16,
                    //     color: "#fff"
                    // }, () => this.onClicks(6))}
                />
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center', margin: 20,
                    backgroundColor: '#fff',
                    width: window_width - 40,
                    height: window_width,
                    paddingTop: 40,
                    borderRadius: 10
                }}
                >
                    <Text
                        style={{color: '#333', fontSize: 20, position: "absolute", zIndex: 1, top: 30}}> 扫一扫，向我付款</Text>

                    <View style={{margin: 30}}>
                        <QRCode
                            value={this.state.text}
                            size={window_width / 5 * 3}
                            bgColor='black'
                            fgColor='white'/>
                    </View>
                </View>
                <TouchableOpacity
                onPress={()=>this.onClicks("inRecord")}
                    style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                        position: "absolute",
                        zIndex: 1,
                        bottom: 70
                    }}
                >
                    <Text style={{
                        color: '#FFF',
                        fontSize: 20,
                    }}> 转入记录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onClicks(type) {
        switch(type){
            case "inRecord":
            this.props.navigation.navigate('TranMoneyRecord',{
                tranType:"in",
            });
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