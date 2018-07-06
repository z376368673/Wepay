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
            type: type,
        }
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: mainColor}]}>
                <NavigationBar
                    title={this.state.type === 0 ? "找回登陆密码" : "找回支付密码"}
                    navigation={this.props.navigation}
                />
                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入手机号码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={this.state.type === 0 ? "default" : "numeric"}
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入验证码'}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        keyboardType={this.state.type === 0 ? "default" : "numeric"}
                        onChangeText={(text) => this.setState({text: text})}/>
                    <TouchableOpacity onPress={()=>this.onClicks(0)}>
                    <Text style={{fontSize: 18, color: "#EAC100", padding:5}}>
                    获取验证码</Text></TouchableOpacity>
                </View>

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请设置新密码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        keyboardType={this.state.type === 0 ? "default" : "numeric"}
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>

                <View style={styles.itemView}>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'确认新密码'}
                        //defaultValue={userName}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        keyboardType={this.state.type === 0 ? "default" : "numeric"}
                        onChangeText={(text) => this.setState({text: text})}/>
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
                        backgroundColor: "#004B97",
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
            case 0://发送验证码

                break
            case 1://确定
                // this.props.navigation.navigate('ModifyNickName', {
                //     userName: this.state.nickname,
                //     callbacks: (name) => {
                //         this.getCallBackValue(name)
                //     }
                // });
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
        backgroundColor: "#129478",
        borderRadius: 3,
        borderColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        marginTop: 15,
        marginLeft:20,
        marginRight:20,
    },
    itemTextInput: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
    }
});