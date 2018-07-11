import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor, window_width } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import AsySorUtils from '../../dao/AsySorUtils';
import BaseUrl from '../../util/BaseUrl';
import HttpUtils from '../../util/HttpUtils';
import DialogUtils from '../../util/DialogUtils';

/**
 * 修改昵称
 */
export default class ModifyNickName extends BaseComponent {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        const { userName, sessionId } = this.props.navigation.state.params
        this.state = {
            userInfo:null,
            userName: userName,
            sessionId: sessionId,
        }
        this.getUserInfo((userInfo)=>{
            this.setState({
                userInfo:userInfo,
            })
        })
    }



    /**
     * 获取banner图片
     */
    updateUserName() {
        DialogUtils.showLoading()
        let url = BaseUrl.updateUserName(this.state.sessionId,this.state.userName )
        HttpUtils.getData(url)
            .then(result => {
                if (result.code === 1) {
                    //更新用户本地信息
                    this.upDataUserInfo(this.state.userInfo,()=>{
                        //这个nickname 是上一个界面里 
                        this.navigation.state.params.callbacks({ nickname: this.state.userName })
                        this.props.navigation.goBack()
                    })
                    DialogUtils.showToast("修改成功")
                } else {
                    DialogUtils.showToast(result.msg)
                }
                DialogUtils.hideLoading()
            })
            .catch(error => {
                DialogUtils.showToast("修改昵称失败" + error.message)
                DialogUtils.hideLoading()
            })
    }
    render() {

        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
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
                        style={{ height: 40, flex: 1, fontSize: 16, color: '#333', marginLeft: 8 }}
                        placeholder={'请输入新的昵称'}
                        defaultValue={this.state.userName}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        onChangeText={(text) => this.setState({ userName: text })}
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
        this.updateUserName();


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