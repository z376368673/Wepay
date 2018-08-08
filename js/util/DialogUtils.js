import React from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import { Overlay, Toast, ActionSheet } from "teaset";

export default class DialogUtils {

    /**
     * 消息对话框
     * @param {*} text 提示类容 
     * @param {*} confirm 确定按钮回调
     * @param {*} cancel 取消按钮回调
     * @param {*} Text1 确定按钮文字
     * @param {*} Text2 取消按钮文字
     */
    static showPop(text, confirm, cancel, Text1, Text2) {
        let overlayView = (
            <Overlay.PopView
                style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}
                type={"zoomIn"}//动画效果
                modal={false}//点击任意区域消失 
                ref={v => this.PopView = v}
            >
                <View style={{ backgroundColor: "#fff", minWidth: 300, minHeight: 100, flexDirection: 'column', borderRadius: 15 }}>
                    {/* 内容 */}
                    <View style={{ minHeight: 100, justifyContent: "center", alignItems: "center", padding: 25 }}>
                        <Text style={{ fontSize: 18, color: "#333" }}>{text}</Text>
                    </View>
                    {/* 按钮 */}
                    <View style={{ backgroundColor: "#e0e0e0", height: 1 }} />
                    <View style={{ justifyContent: "center", alignItems: "center", height: 60, flexDirection: "row", }}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                this.PopView && this.PopView.close()
                                cancel ? cancel() : {}
                            }}
                        >
                            <Text style={{ fontSize: 20, color: "#333" }}>{Text2 ? Text2 : "取消"}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, backgroundColor: "#e0e0e0", height: 60 }} />
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                this.PopView && this.PopView.close(),
                                    confirm ? confirm() : {}
                            }}
                        >
                            <Text style={{ fontSize: 20, color: "#333" }}>{Text1 ? Text1 : "确定"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }


    /**
     * 消息提示框
     * @param {*} text 提示类容 
     * @param {*} confirm  按钮回调
     * @param {*} confirmText  按钮文字
     */
    static showMsg(text, confirmText, confirm, ) {
        let overlayView = (
            <Overlay.PopView
                style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}
                type={"zoomIn"}//动画效果
                modal={false}//点击任意区域消失 
                ref={v => this.MsgView = v}
            >
                <View style={{ backgroundColor: "#fff", minWidth: 300, minHeight: 100, flexDirection: 'column', borderRadius: 15 }}>
                    {/* 内容 */}
                    <View style={{ minHeight: 100, justifyContent: "center", alignItems: "center", padding: 25 }}>
                        <Text style={{ fontSize: 18, color: "#333" }}>{text}</Text>
                    </View>
                    {/* 按钮 */}
                    <View style={{ backgroundColor: "#e0e0e0", height: 1 }} />
                    <View style={{ justifyContent: "center", alignItems: "center", height: 60, flexDirection: "row", }}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                this.MsgView && this.MsgView.close(),
                                    confirm ? confirm() : {}
                            }}
                        >
                            <Text style={{ fontSize: 20, color: "#333" }}>{confirmText ? confirmText : "确定"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    /**
     * 显示Toast提示
     * @param {*} text 
     */
    static showToast(text) {
        Toast.message(text)
    }


    /**
     * 加载动画
     * @param text
     */
    static showLoading(text) {
        let overlayView = (
            <Overlay.View
                style={{ alignItems: 'center', justifyContent: 'center' }}
                modal={false}
                overlayOpacity={0}
                ref={v => this.loadingView = v} >
                <View style={{ backgroundColor: '#333', padding: 25, borderRadius: 15, alignItems: 'center' }}>
                    <ActivityIndicator
                        size={'large'}
                        animating={true}
                    />
                    <Text style={{ fontSize: 16, color: "#fff" }}>{text ? text : "加载中..."}</Text>
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }
    /**
     * 关闭加载动画
     */
    static hideLoading() {
        if (this.loadingView)
            this.loadingView.close();
    }
    /**
     * 底部弹出选择框
     * @param {*} array 
     * @param {*} callback 
     */
    static showDownSheet(array, callback) {
        let items = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            items.push({ title: element, onPress: () => callback(element) });
        }
        let cancelItem = { title: '关闭' };
        ActionSheet.show(items, cancelItem);
    }




    // /**
    //  * 红包
    //  * @param {*} text 提示类容 
    //  * @param {*} confirm  按钮回调
    //  * @param {*} confirmText  按钮文字
    //  */
    // static redPacket(text, confirm,) {
    //     let overlayView = (
    //         <Overlay.PopView
    //             style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}
    //             type={"zoomIn"}//动画效果
    //             modal={true}//点击任意区域消失 
    //             ref={v => this.MsgView = v}
    //         >
    //             <View style={{ minWidth: 300, minHeight: 100, flexDirection: 'column',  }}>
    //                 {/* 内容 */}
    //                 <View style={{ backgroundColor:"#F9F900",marginBottom:-100,zIndex:1,
    //                  justifyContent: "center", alignItems: "center", padding: 25,marginLeft:30,marginRight:30, }}>
    //                     <Text style={{ fontSize: 23, color: "#d11" ,marginTop:40,}}>{text}元</Text>
    //                     <View style={{ backgroundColor: "#d11", height: 0.5 ,width:120,marginTop:10,marginBottom:10}} />
    //                     <Text style={{ fontSize: 15, color: "#d11" }}>天天签到红包不断</Text>
    //                 </View>
    //                 <View style={{backgroundColor:"#d11",minHeight: 160}}>
    //                 <Text style={{ fontSize: 18, color: "#F9F900",position:"absolute", bottom:15,alignSelf:"center"}}>Wepay签到红包</Text>
    //                 </View>
    //                 <View style={{ justifyContent: "center", alignItems: "center",  flexDirection: "row", }}>
    //                     <TouchableOpacity
    //                         style={{ justifyContent: "center", 
    //                         alignItems: "center",height:48,
    //                         backgroundColor:"#f9f900",borderRadius:24,
    //                         borderColor:"#EAC100",borderWidth:3,margin:30,
    //                        paddingLeft:40,paddingRight:40}}
    //                         onPress={() => {
    //                             this.MsgView && this.MsgView.close(),
    //                                 confirm? confirm() : {}
    //                         }} >
    //                         <Text style={{ fontSize: 20, color: "#d11" }}>存入余额</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </Overlay.PopView>
    //     );
    //     Overlay.show(overlayView);
    // }


    /**
     * 红包
     * @param {*} text 提示类容 
     * @param {*} confirm  按钮回调
     * @param {*} confirmText  按钮文字
     */
    static redPacket(text, confirm, ) {
        let overlayView = (
            <Overlay.PopView
                style={{ alignItems: 'center', justifyContent: 'center', padding: 40 }}
                type={"zoomIn"}//动画效果
                modal={true}//点击任意区域消失 
                ref={v => this.MsgView = v}
            >
                <View style={{
                    minWidth: 300, minHeight: 100,
                    flexDirection: 'column', justifyContent: "center", alignItems: "center"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.MsgView && this.MsgView.close(),
                                confirm ? confirm() : {}
                        }}>
                        <Image source={require("../../res/images/hongbao.png")} />
                    </TouchableOpacity>

                    <Text style={{ flex: 1, fontSize: 23, color: "#fff", position: "absolute", }}>{text}元</Text>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

}