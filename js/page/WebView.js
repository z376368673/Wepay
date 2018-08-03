import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Linking,
} from 'react-native';
import BaseComponent ,{BaseStyles}from "./BaseComponent";


export  default class Welcome extends BaseComponent {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <WebView style={{width:'100%',height:'100%'}}>
                <Text style={BaseStyles.container_row}> Welcome Wepay</Text>
            </WebView>
        );
    }
}
