import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Theme, Overlay, Button } from 'teaset';



const { height, width } = Dimensions.get('window');
const pwdLength = 6; //密码长度 ，建议最长不要超过9
class PassNumInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwdArr: []
        }
        this.numArr = [1, 2, 3, "删除", 4, 5, 6, 0, 7, 8, 9, "关闭"]
    }

    static defaultProps = {
        onClose: () => { }, //关闭
        onChangePassWord: () => { },//当密码改变时调用
        onComplete: () => { },// 当密码长度等于6时调用， 也就是说 当密码输入完成时
    }

    creatPwd() {
        var views = [];
        for (var i = 0; i < pwdLength; i++) {
            views.push(
                <View key={i} style={{ padding: 5, width: 40, height: 40, borderColor: "#333", borderWidth: 0.5 }}>
                    <Text
                        style={{
                            width: 30, height: 30,
                            fontSize: 30, color: "#000",
                            borderColor: "#333",
                            borderRadius: 15,
                            borderWidth: this.state.pwdArr[i] ? 15 : 1
                        }}
                    />
                </View>
            )
        }
        return views;
    }

    onClick(key) {
        switch (key) {
            case "删除":
                this._delPassword()
                this.onChangePassWord()
                break;
            case "关闭":
                this.props.onClose()
                break;
            default:
                this._setPassword(key)
                this.onChangePassWord()
                break;
        }
    }
    onChangePassWord() {
        let len = this.state.pwdArr.length
        this.props.onChangePassWord(this.state.pwdArr, len)
        if (len === pwdLength) {
            var pwd = ""
            this.state.pwdArr.forEach(element => {
                pwd += element;
            });
            this.props.onComplete(pwd)
            this.props.onClose()
        }
    }
    _delPassword() {
        if (this.state.pwdArr.length > 0) {
            var pwd = this.state.pwdArr
            pwd.pop()
            this.setState({
                pwdArr: pwd,
            })
        }
    }
    _setPassword(num) {
        if (this.state.pwdArr.length < pwdLength) {
            var pwd = this.state.pwdArr
            pwd.push(num)
            this.setState({
                pwdArr: pwd,
            })
        }
    }

    creatJianPan() {
        var views = []
        this.numArr.map((num, index) => {
            views.push(
                <TouchableOpacity
                    style={{ width: width / 4, height: width / 4 - 15, borderColor: "#999", borderWidth: 0.3, justifyContent: "center", alignItems: "center" }}
                    key={index}
                    onPress={() => this.onClick(num)}>
                    <Text style={{ fontSize: 20, color: "#333", }}>{num}</Text>
                </TouchableOpacity>
            )
        })
        return views
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "center" }}>
                <View style={{
                    flexDirection: "row", flexWrap: "wrap",
                    backgroundColor: "#fff", alignSelf: "flex-end", marginTop: 170,
                }}>
                    {this.creatJianPan()}
                </View>
                <View style={{
                    flexDirection: "column", padding: 20,
                    borderColor: "#666", borderWidth: 1,
                    backgroundColor: "#fff"
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.props.onClose()}>
                            <Text style={{ fontSize: 24, color: "#333", }}> X </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: "#333", }}>请输入{pwdLength}位支付密码</Text>
                    </View>
                    <View style={{
                        backgroundColor: "#eee",
                        height: 1,
                        flexDirection: 'column',
                        marginTop: 5,
                        marginBottom: 20,
                    }} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center", alignItems: "center",
                    }}>
                        {this.creatPwd()}
                    </View>

                </View>
            </View>
        );
    }
   
}

var PassWordInput = {
    showPassWordInput(onComplete) {
        let width = require('Dimensions').get('window').width
        let height = require('Dimensions').get('window').height
        let overlayView = (         //"left"
            <Overlay.PullView side={'bottom'} modal={true} ref={v => this.overlayPullView = v}>
                <View style={{ minWidth: width, minHeight: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <PassNumInput
                        onClose={() => this.overlayPullView ? this.overlayPullView.close() : null}
                        onComplete={pwd => {
                            onComplete(pwd)
                        }}
                        onChangePassWord={(pwd, len) => { }}
                    />
                </View>
            </Overlay.PullView>
        );
        if (!overlayView.isShow)
            Overlay.show(overlayView);
    }
}
export default PassWordInput;

