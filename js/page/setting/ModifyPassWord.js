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
 * 修改密码
 */
export default class ModifyPassWord extends BaseComponent {
    constructor(props) {
        super(props);
        const {type} = this.props.navigation.state.params
        this.state = {
            text: '18629448593',
            type:type,
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title={this.state.type === 0 ? "修改登陆密码" : "修改支付密码"}
                    navigation={this.props.navigation}
                />
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        旧密码</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入旧密码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType={this.state.type === 0 ? "default" : "numeric"}
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        新密码</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入新密码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType={this.state.type === 0 ? "default" : "numeric"}
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <TouchableOpacity onPress={()=>this.onClicks(0)}>
                    <View style={{height: 50, justifyContent: 'center', alignItems: 'flex-end',}}>
                        <Text style={{
                            fontSize: 15,
                            color: "#d11",
                            marginRight: 20
                        }}> 忘记{this.state.type === 0 ? "登陆" : "支付"}密码</Text></View>
                </TouchableOpacity>
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
                    onPress={() => this.onClicks(1)}
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

    onClicks(type) {
        switch (type) {
            case 0://忘记密码
                this.props.navigation.navigate('ForgetPassWord',{
                    type:this.state.type
                })
                break
            case 1://确定
                this.props.navigation.navigate('ModifyNickName', {
                    userName: this.state.nickname,
                    callbacks: (name) => {
                        this.getCallBackValue(name)
                    }
                });
                break
        }
        //this.props.navigation.goBack()
        //this.navigation.state.params.callbacks({nickname: this.state.text})
    }
}
export const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position:"absolute",  //绝对布局
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 1
    },
    itemText: {
        fontSize: 16, color: "#333", width: 90
    },
    itemTextInput: {
        height: 40, flex: 1, fontSize: 16, color: '#333', marginLeft: 8
    }
});