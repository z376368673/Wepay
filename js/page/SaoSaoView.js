import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BaseComponent ,{BaseStyles}from "./BaseComponent";
import NavigationBar from "../common/NavigationBar";


export  default class SaoSaoView extends BaseComponent {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={BaseStyles.container}>
                <NavigationBar
                    title='扫一扫'
                    navigation={this.props.navigation}
                    style={{backgroundColor:'#88333333'}}
                    statusBar={{
                        statusBar: 'light-content',
                        hide: false,
                        translucent: false,
                        backgroundColor:  '#88333333',}}
                    rightView={NavigationBar.getRightStyle_Text('相册',{fontSize:16, color:"#fff"},()=>this.onClicks(6))}
                />
                <Text style={BaseStyles.container_row}> Welcome Wepay</Text>
            </View>
        );
    }
    onClicks(type) {

    }
}
