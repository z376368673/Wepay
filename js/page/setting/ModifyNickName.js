import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import BaseComponent, {BaseStyles, mainColor, window_width} from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";


/**
 * 修改昵称
 */
export default class ModifyNickName extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
        }
        this.navigation = this.props.navigation;
    }

    render() {
        const {userName} = this.props.navigation.state.params
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='修改昵称'
                    navigation={this.props.navigation}
                />
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: "#fff",
                    marginTop: 8
                }]}>
                    <TextInput
                        style={{height: 40, flex: 1, fontSize: 16, color: '#333', marginLeft: 8}}
                        placeholder={'请输入新的昵称'}
                        defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({text:text})}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        height: 45,
                        marginTop: 40,
                        marginLeft: 15,
                        marginRight: 15,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: mainColor,
                    }}
                    onPress={() => this.onClicks()}
                >
                    <Text style={{
                        alignSelf: "center",
                        color: '#FFF',
                        fontSize: 20,
                    }}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }
    onClicks() {
        this.props.navigation.goBack()
        //这个nickname 是上一个界面里 state的属性
        this.navigation.state.params.callbacks({nickname:this.state.text})

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