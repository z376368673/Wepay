import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import AutoGrowingTextInput from '../../common/AutoGrowingTextInput';
import NavigationBar from "../../common/NavigationBar";
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import { PullPicker } from 'teaset';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';
import DialogUtils from '../../util/DialogUtils';


/**
 * 申请店铺
 */
const width_w = Utils.getWidth() / 2 - 20;
export default class ApplyStore extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '其输入您的意见',
            card1: require("../../../res/images/addimg.png"),
            card2: require("../../../res/images/addimg.png"),
            headImg: require("../../../res/images/addimg.png"),
            selectedIndex: null,
            longitude:0,
            latitude:0,
        }
        this.items = [
            '全部',
          ];
    }
    componentDidMount(){
        Utils.getLocation((coords)=>{
            Utils.getCityInfoBy(
                JSON.stringify(coords.longitude), 
                JSON.stringify(coords.latitude),
                (addressComponent)=>{
                    this.setState({
                        longitude:addressComponent.longitude,
                        latitude:addressComponent.latitude
                    })
            })
        })
    }

    show() {
        PullPicker.show(
            '选择店铺分类',
            this.items,
            this.state.selectedIndex,
            (item, index) => this.setState({ selectedIndex: index })
        );
    }
    setImg(type, source) {
        switch (type) {
            case "card1":
                this.setState({
                    card1: source,
                })
                break;
            case "card2":
                this.setState({
                    card2: source,
                })
                break;
            case "headImg":
                this.setState({
                    headImg: source,
                })
                break;
        }
    }


    /**
    * 使用方式sync/await
    * 相册参数暂时只支持默认参数中罗列的属性；
    * @returns {Promise<void>}
    */
    handleAsyncSelectPhoto = async (type, isCrop, showCropCircle) => {

        SYImagePicker.removeAllPhoto()
        try {
            const photos = await SYImagePicker.asyncShowImagePicker({ imageCount: 1, isCrop: isCrop, showCropCircle: showCropCircle });
            photos.map((photo, index) => {
                let source = { uri: photo.uri };
                if (photo.enableBase64) {
                    source = { uri: photo.base64 };
                }
                this.setImg(type, source)
            })
        } catch (err) {
            // 取消选择，err.message为"取消"
            // alert(err,photos)
        }
    };


    render() {
        let {selectedIndex, modalSelectedIndex} = this.state;
        let selected = (selectedIndex || selectedIndex === 0) ? this.items[selectedIndex] : '请点击选择店铺分类';
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={"申请店铺"}
                    navigation={this.props.navigation}
                />
                <ScrollView >
                    <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: "#fff", marginBottom: 8, }}>
                            <Text style={{
                                alignSelf: "center",
                                color: '#d11',
                                fontSize: 14,
                            }}>*请在认真填写申请资料</Text>
                        </View>

                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                姓名</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                placeholder={'请输入身份证姓名'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"default"}
                                maxLength={12}
                                onChangeText={(text) => this.setState({ text: text })} />
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                身份证号</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                placeholder={'请输入真实身份证号'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"numeric"}
                                maxLength={18}
                                onChangeText={(text) => this.setState({ text: text })} />
                        </View>

                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                手机号</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                placeholder={'请输入本人手机号'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                maxLength={11}
                                underlineColorAndroid='transparent'
                                keyboardType={"numeric"}
                                onChangeText={(text) => this.setState({ text: text })} />
                        </View>

                        <Text style={{
                            color: '#666',
                            fontSize: 14,
                            backgroundColor: "#fff",
                            marginTop: 10,
                            padding: 10,
                        }}>*请上传身份证正反面</Text>

                        <View style={{ flexDirection: 'row', backgroundColor: "#fff" }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleAsyncSelectPhoto("card1", false, false)}>
                                <View style={{ flexDirection: "column", padding: 10, backgroundColor: "#fff" }}>
                                    <Image style={{
                                        alignSelf: "center",
                                        width: width_w, height: width_w / 3 * 2,
                                        borderColor: "#ddd",
                                        borderWidth: 1,
                                    }}
                                        source={this.state.card1}
                                    />
                                    <Text style={{
                                        alignSelf: "center",
                                        color: '#333',
                                        fontSize: 15,
                                        marginTop: 10,
                                    }}>身份证正面</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleAsyncSelectPhoto("card2", false, false)}>
                                <View style={{ flexDirection: "column", padding: 10, backgroundColor: "#fff" }}>
                                    <Image style={{
                                        alignSelf: "center",
                                        width: width_w, height: width_w / 3 * 2,
                                        borderColor: "#ddd",
                                        borderWidth: 1,
                                    }}
                                        source={this.state.card2}
                                    />
                                    <Text style={{
                                        alignSelf: "center",
                                        color: '#333',
                                        fontSize: 15,
                                        marginTop: 10,
                                    }}>身份证反面</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* 申请店铺信息 */}
                        <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#fff", marginTop: 8, alignItems: "center" }}>
                            <Text style={styles.itemText}>店铺头像</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleAsyncSelectPhoto("headImg", true, true)}>
                                <Image style={{
                                    alignSelf: "center",
                                    width: 50, height: 50,
                                    borderColor: "#ddd",
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    marginLeft: 15,
                                }}
                                    source={this.state.headImg}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                店铺名称</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                placeholder={'请输入店铺名称,(不超过10个字)'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                maxLength={10}
                                keyboardType={"default"}
                                onChangeText={(text) => this.setState({ text: text })} />
                        </View>
                        <View style={[styles.itemView,{alignItems: "center",height:55}]}>
                            <Text style={[styles.itemText]}>
                                店铺分类</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>this.show()}>
                                <View style={{flexDirection:"row"}}>
                                <Text style={{fontSize: 16, color: "#333",marginLeft:10}}>{selected}</Text>
                                {/* <Image
                                style={{width:20,height:20}}
                                source={require("../../../res/images/ic_tiaozhuan.png")}    
                                /> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                店铺地址</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                placeholder={'请输入店铺详细'}
                                //defaultValue={userName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                maxLength={10}
                                keyboardType={"default"}
                                onChangeText={(text) => this.setState({ text: text })} />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                height: 45,
                                marginTop: 30,
                                marginLeft: 15,
                                marginRight: 15,
                                marginBottom:50,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: mainColor,
                            }}
                            onPress={() => this.onClicks("sumbitApply")}
                        >
                            <Text style={{
                                alignSelf: "center",
                                color: '#FFF',
                                fontSize: 20,
                            }}>提交申请</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

        );
    }
    onClicks(type) {
        if(type==="sumbitApply"){
            this.props.navigation.navigate('MyStore'); 
        }
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
        marginTop: 0.5
    },
    itemText: {
        fontSize: 16, color: "#333", width: 90
    },
    itemTextInput: {
        height: 30, flex: 1, fontSize: 16, color: '#333', marginLeft: 8
    }
});