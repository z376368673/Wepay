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
import { Checkbox } from "teaset"
/**
 * 编辑地址
 */
export default class EditAddress extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            text: '18629448593',
            isChecked:false
        }
        this.navigation = this.props.navigation;
    }

    render() {
        return (
            <View style={[BaseStyles.container_column, {backgroundColor: "#f1f1f1"}]}>
                <NavigationBar
                    title='编辑地址'
                    navigation={this.props.navigation}
                />
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        姓名</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入姓名'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        电话</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入电话'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>
                        收货地址</Text>
                    <TextInput
                        style={styles.itemTextInput}
                        placeholder={'请输入详细收货地址'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        onChangeText={(text) => this.setState({text: text})}/>
                </View>
                <View style={{ padding: 10 }}>
                    <Checkbox
                        title='默认地址'
                        size='md'
                        checked={this.state.isChecked}
                        onChange={value => this.defaultAddress(value)}
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
    defaultAddress(value){
        this.setState({
            isChecked:value,
        })
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