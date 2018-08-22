import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseComponent, { BaseStyles } from "../BaseComponent";
import NavigationBar from "../../common/NavigationBar";
import HttpUtils from "../../util/HttpUtils";
import BaseUrl from "../../util/BaseUrl";
import RefreshFlatList from "../../common/RefreshFlatList"
import DialogUtils from '../../util/DialogUtils';
import Colors from "../../util/Colors"
import Utils from '../../util/Utils';
//W宝

export default class Wbao extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            isNull: false,

            WBAssets: "0.00", //W宝资产
            MyAssets: "0.00", //可用资产
        }
        this.userInfo = this.getUserInfo();
        this.action = 0
    }
    //界面加载完成
    componentDidMount() {
        this._refreshData()
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
        this.refList.setData([1, 2, 3, 4, 5])
        // if (this.action === 1) {
        //     this.url = BaseUrl.getOutUndoneUnselectedUrl(this.userInfo.sessionId, this.pageIndex)
        // } else if (this.action === 2) {
        //     this.url = BaseUrl.getOutUndoneUnselectedUrl(this.userInfo.sessionId, this.pageIndex)
        // } else {
        //     this.url = BaseUrl.getOutUndoneUnselectedUrl(this.userInfo.sessionId, this.pageIndex)
        // }
        // HttpUtils.getData(this.url)
        //     .then(result => {
        //         if (result.code === 1) {
        //             if (isRefesh) {
        //                 this.refList.setData(result.data)
        //                 if (result.data.length < 1) {
        //                     DialogUtils.showToast("暂无商品")
        //                 }
        //                 this.setState({
        //                     isNull: result.data.length < 1 ? true : false,
        //                 })
        //             } else {
        //                 this.refList.addData(result.data)
        //             }
        //             this.pageIndex += 1
        //         } else if (result.code === 2||result.code === 4) {
        //             DialogUtils.showToast(result.msg)
        //             this.goLogin(this.props.navigation)
        //         } else {
        //             DialogUtils.showToast(result.msg)
        //         }
        //     })

    }

    render() {
        return (
            <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                <NavigationBar
                    title='W宝数字中心'
                    navigation={this.props.navigation}
                />
                {/* top布局 */}
                <View style={[{ alignItems: 'center', padding: 10, backgroundColor: Colors.mainColor }]}>
                    <View style={{ marginTop: 10, flexDirection: "row" }}>
                        <Text>昨日收益 (余额)</Text>
                        <Image source={require("../../../res/images/logo-d.png")} style={{ height: 15, width: 15, resizeMode: "stretch" }} />
                    </View>
                    <Text style={{ fontSize: 15, color: "#fff", marginTop: 10, }}>{18.123131}</Text>
                </View>
                {/* 顶部布局  资产  余额*/}
                <View style={[{
                    flexDirection: 'row', backgroundColor: Colors.mainColor
                }]}>
                    <TouchableOpacity
                        activeOpacity={0.8} >
                        <View style={{ padding: 10, flexDirection: 'column', alignItems: "center", justifyContent: "center", width: Utils.getWidth() / 2, backgroundColor: "#62abad" }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>W宝总资产</Text>
                            <Text style={{ fontSize: 16, color: '#fff', marginTop: 5 }}>{this.state.WBAssets}</Text>
                        </View></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}  onPress={()=>this._goTran(3)}>
                        <View style={{ padding: 10, flexDirection: 'column', alignItems: "center", justifyContent: "center", width: Utils.getWidth() / 2, backgroundColor: "#62a2a4" }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}> 可用资产</Text>
                            <Text style={{ fontSize: 16, color: '#fff', marginTop: 5 }}>{this.state.MyAssets}</Text>
                        </View></TouchableOpacity>
                </View>
                <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: Colors.white }}>
                    <TouchableOpacity onPress={() => this.onClick(0)} style={{ flex: 1 }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: this.state.selectIndex === 0 ? Colors.red : Colors.text3, fontSize: 15, marginTop: 5, fontWeight: "900" }}>收益记录</Text>
                        </View></TouchableOpacity>
                    <View style={{ backgroundColor: Colors.lineColor, width: 0.5, height: 20, marginTop: 10, marginBottom: 10 }}></View>
                    <TouchableOpacity onPress={() => this.onClick(1)} style={{ flex: 1 }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: this.state.selectIndex === 1 ? Colors.red : Colors.text3, fontSize: 15, marginTop: 5, fontWeight: "900" }}>转出记录</Text>
                        </View></TouchableOpacity>
                    <View style={{ backgroundColor: Colors.lineColor, width: 0.5, height: 20, marginTop: 10, marginBottom: 10 }}></View>
                    <TouchableOpacity onPress={() => this.onClick(2)} style={{ flex: 1 }}>
                        <View style={{ alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ color: this.state.selectIndex === 2 ? Colors.red : Colors.text3, fontSize: 15, marginTop: 5, fontWeight: "900" }}>转入记录</Text>
                        </View></TouchableOpacity>
                </View>
                
                {
                    this._getItemTiele()
                }
                <View style={{ flex: 1, marginTop: 1, marginBottom: 45 }}>
                    {
                        this.state.isNull ? <Text style={{ color: "#333", fontSize: 16, backgroundColor: Colors.white, padding: 10 }}>没找到相关数据</Text> : null
                    }
                    <RefreshFlatList
                        ref={refList => this.refList = refList}
                        isDownLoad={true}
                        renderItem={(items) => this._getItem(items)}
                        onRefreshs={() => this._refreshData()}
                    />

                </View>


                <View style={[{ flexDirection: 'row', }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._goTran(2)}
                        style={{
                            padding: 10, flexDirection: 'column', alignItems: "center",
                            justifyContent: "center", width: Utils.getWidth() / 2, backgroundColor: Colors.red_d9
                        }}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>转入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={()=>this._goTran(1)}
                        style={{
                            padding: 10, flexDirection: 'column', alignItems: "center",
                            justifyContent: "center", width: Utils.getWidth() / 2, backgroundColor: Colors.blue_66
                        }}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>转出</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }

    _getItemTiele() {
        let item1 = <View style={{ flexDirection: 'row', marginTop: 2, backgroundColor: Colors.black_dc }}>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>来源</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>数量(余额)</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>时间</Text>
        </View>

        let item2 = <View style={{ flexDirection: 'row', marginTop: 2, backgroundColor: Colors.black_dc }}>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>数量</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>时间</Text>
        </View>
        let item3 = <View style={{ flexDirection: 'row', marginTop: 2, backgroundColor: Colors.black_dc }}>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>来源</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>数量</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>时间</Text>
        </View>
        if (this.state.selectIndex === 0) {
            return item1
        } else if (this.state.selectIndex === 1) {
            return item2
        } else {
            return item3
        }
    }

    /**
     * 绘制itemView
     * @param data
     * @returns {*}
     * @private
     */
    _getItem(data) {
        let item1 = <View style={{ flexDirection: 'row', marginTop: 2, backgroundColor: Colors.white }}>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>{"静态收益"}</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>{Utils.formatNumBer("0.2231", 4)}</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>{"2018/12/25 21:12:20"}</Text>
        </View>

        let item2 = <View style={{ flexDirection: 'row', marginTop: 2, backgroundColor: Colors.white }}>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>{Utils.formatNumBer("0.2231", 4)}</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>{"2018/12/25 21:12:20"}</Text>
        </View>
        let item3 = <View style={{ flexDirection: 'row', marginTop: 2, backgroundColor: Colors.white }}>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>{"Wepay资产"}</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 4, textAlign: "center" }}>{Utils.formatNumBer("0.2231", 4)}</Text>
            <Text style={{ padding: 8, color: "#333", fontSize: 13, width: Utils.getWidth() / 2, textAlign: "center" }}>{"2018/12/25 21:12:20"}</Text>
        </View>
        if (this.state.selectIndex === 0) {
            return item1
        } else if (this.state.selectIndex === 1) {
            return item2
        } else {
            return item3
        }
    }

    transactionRecord() {//交易记录
        this.props.navigation.navigate('ZhongChouRecord');
    }

    onClick(type) {
        switch (type) {
            case 0: //预热中
            case 1://进行中
            case 2://已结束
                this.setState({
                    selectIndex: type,
                })
                this.action = type
                this._refreshData()
                break;
        }
    }

    _goTran(number) {
        this.props.navigation.navigate('TranWB',{
            type:number
        });
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