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
 * 添加银行卡
 */
export default class AddBankCard extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
        }
        this.navigation = this.props.navigation;
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='添加银行卡'
                    navigation={this.props.navigation}
                />
                <View style={{height: 50, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: 16, color: "#888",}}>
                        *请帮定持卡人本人的银行卡，姓名一经填写不可修改</Text></View>

                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        持卡人姓名</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入真实姓名'}
                        //defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        开户银行</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请选择开户行'}
                        //defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        银行卡号</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入开户银行卡号'}
                        //defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        开户支行</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入开户银行的支行分行'}
                        //defaultValue={userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='default'
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