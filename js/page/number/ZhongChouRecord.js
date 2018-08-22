import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import Utils from "../../util/Utils";
import HttpUtils from "../../util/HttpUtils";
import { SegmentedBar, Label } from 'teaset';
import BaseUrl from '../../util/BaseUrl';
import RefreshFlatList from '../../common/RefreshFlatList';
import DialogUtils from '../../util/DialogUtils';
import Colors from "../../util/Colors"

/**
 * 众筹记录
 */

const width = Utils.getWidth()
export default class ZhongChouRecord extends BaseComponent {
    pageIndex = 1;
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        }
        this.userInfo = this.getUserInfo()
        this.activeIndex = 0;
    }
    //界面加载完成
    componentDidMount() {
        this._refreshData()
    }
    selectIndex(index) {
        this.setState({ activeIndex: index })
        this.activeIndex = index;
        this._refreshData()
    }
    render() {
        let { activeIndex } = this.state;
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={"众筹项目记录"}
                    navigation={this.props.navigation} />
                <View style={{ flexDirection: "row", backgroundColor: Colors.white, justifyContent: "center", padding: 10 }}>
                    <TouchableOpacity
                        onPress={() => this.selectIndex(0)}
                        style={{
                            borderColor: Colors.r1, borderWidth: 1, borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
                            justifyContent: "center", alignItems: "center", backgroundColor: activeIndex ? Colors.white : Colors.red
                        }}>
                        <Text style={{ padding: 8, fontSize: 16, marginLeft: 25, marginRight: 10, color: activeIndex ? Colors.red : Colors.white }}>购买记录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.selectIndex(1)}
                        style={{
                            borderColor: Colors.r1, borderWidth: 1, borderTopRightRadius: 18, borderBottomRightRadius: 18,
                            justifyContent: "center", alignItems: "center", backgroundColor: activeIndex ? Colors.red : Colors.white
                        }} >
                        <Text style={{ padding: 8, fontSize: 16, marginLeft: 25, marginRight: 10, color: activeIndex ? Colors.white : Colors.red }}>释放记录</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection:"row",padding: 5, marginTop: 1 ,backgroundColor:Colors.white}}>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 14, color: Colors.text3, flex: 1,textAlign:"center" }}>数量</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 14, color: Colors.text3, flex: 1,textAlign:"center" }}>总价</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 14, color: Colors.text3,flex: 1,textAlign:"center"}}>时间</Text>
                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: "#f1f1f1", marginTop: 1, }}>
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        isDownLoad={true}
                        onRefreshs={() => this._refreshData()}
                        onLoadData={() => this._onLoadData()}
                        renderItem={(items) => this.renderItem(items)}
                    />
                </View>
            </View>
        );
    }

    renderItem(data) {
        return <View style={{flexDirection: "row", padding: 5, marginTop: 1,backgroundColor:Colors.white ,paddingTop:15,paddingBottom:15}}>
            <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: Colors.text6, flex: 1,textAlign:"center" }}>1000.0000</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: Colors.text6, flex: 1,textAlign:"center" }}>6000.0000</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1, alignItems: "center"}}>
                <Text style={{ fontSize: 14, color: Colors.text6, flex: 1 ,textAlign:"center"}}>{"2018-05-31 14:23:21".replace(" ","\n")}</Text>
            </View>
        </View>
    }

    //刷新数据
    _refreshData() {
        this.refList.refreshStar()
        this.pageIndex = 1;
        this.getData(true)
    }
    //加载更多数据
    _onLoadData() {
        this.getData(false)
    }

    /**
     * 获取数据
     * @param {*} isRefesh  是否刷新
     * @param {*} pageIndex 
     */
    getData(isRefesh) {
        if (this.activeIndex === 0) { //购买记录
            this.url = BaseUrl.getOutUndoneUnselectedUrl(this.userInfo.sessionId, this.pageIndex)
        } else if (this.activeIndex === 1) {//释放记录
            this.url = BaseUrl.getOutUndoneSelectedUrl(this.userInfo.sessionId, this.pageIndex)
        }
        HttpUtils.getData(this.url)
            .then(result => {
                if (result.code === 1) {
                    //alert(JSON.stringify(result.data))
                    if (isRefesh) {
                        result.data.push("aaaa")
                        this.refList.setData(result.data)
                        if (result.data.length < 1) {
                            DialogUtils.showToast("暂无信息")
                        }
                    } else {
                        this.refList.addData(result.data)
                    }
                    this.pageIndex += 1

                } else if (result.code === 2||result.code === 4) {
                    DialogUtils.showToast(result.msg)
                    this.goLogin(this.props.navigation)
                } else {
                    DialogUtils.showToast(result.msg)
                }
            })

    }
}
