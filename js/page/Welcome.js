import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BaseComponent ,{BaseStyles}from "./BaseComponent";


export  default class Welcome extends BaseComponent {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={BaseStyles.container}>
                <Text style={BaseStyles.container_row}> Welcome Wepay</Text>
            </View>
        );
    }
}
