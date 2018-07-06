import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import BaseComponent ,{BaseStyles}from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from "../../util/HttpUtils";
import DialogUtils from '../../util/DialogUtils';

const URL = 'https://api.github.com/search/repositories?q=';
export  default class NoticDetails extends BaseComponent {
    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state
        this.type = params.type? params.type:0;
        this.title= this.type===0?"公告":"消息"
        this.state = {
            textInfo: "正在加载信息..."
        }
    }

    componentDidMount() {
        this.getData("java")
    }
    //获取数据
    getData(value) {
        DialogUtils.showLoading()
        HttpUtils.getData(URL + value)
            .then(result => {
                this.setState({textInfo:JSON.stringify(result.items)})
                DialogUtils.hideLoading();
            })
            .catch(error => {
                this.setState({textInfo:error})
                DialogUtils.hideLoading();
            })
    }
    
    render() {
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={this.title}
                    navigation={this.props.navigation}
                />
                <ScrollView style={{margin:15}}>
                <Text style={{fontSize:16, color:"#333"}}>
                    {this.state.textInfo}</Text>
                </ScrollView>
            </View>
        );
    }

}
