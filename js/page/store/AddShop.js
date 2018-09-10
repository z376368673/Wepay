import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import AutoGrowingTextInput from '../../common/AutoGrowingTextInput';
import NavigationBar from "../../common/NavigationBar";
import BaseComponent, { BaseStyles, mainColor } from "../BaseComponent";
import { PullPicker } from 'teaset';
import SYImagePicker from 'react-native-syan-image-picker'
import Utils from '../../util/Utils';
import DialogUtils from '../../util/DialogUtils';
import HttpUtils from '../../util/HttpUtils';
import BaseUrl from '../../util/BaseUrl';
import EditText from "../../common/EditText";

/**
 * 添加商品 / 编辑修改商品
 */
const width_w = Utils.getWidth() / 2 - 20;
export default class AddShop extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            shopName:"",
            shopPrice:"",
            shopNum:"",
            shopImage: require("../../../res/images/addimg.png"),
            photos:[]
        }
        this.userInfo = this.getUserInfo()
        this.navigation = this.props.navigation;
        this.params = this.props.navigation.state.params;
        this.data = this.params?this.params.data:null;
        this.type = "add"
    }

    componentDidMount(){
       // alert(JSON.stringify(this.data))
        if(this.data){
            this.type = "edit"
            this.setState({
                shopName:this.data.item.goodsName,
                shopPrice:this.data.item.goodsPrice,
                shopNum:this.data.item.goodsStock,
                shopImage:{uri:this.getImgUrl(this.data.item.coverPlan)}
            })
        }
    }


    /**
    * 使用方式sync/await
    * 相册参数暂时只支持默认参数中罗列的属性；
    * @returns {Promise<void>}
    */
    handleAsyncSelectPhoto = async (isCrop, showCropCircle) => {
        SYImagePicker.removeAllPhoto()
        try {
            const photos = await SYImagePicker.asyncShowImagePicker({ imageCount: 1, isCrop: isCrop, showCropCircle: showCropCircle });
            photos.map((photo, index) => {
                let source = { uri: photo.uri };
                if (photo.enableBase64) {
                    source = { uri: photo.base64 };
                }
                this.setState({shopImage:source,photos:[photo]})
            })
        } catch (err) {
            // 取消选择，err.message为"取消"
            // alert(err,photos)
        }
    };

    onClicks() {
        if(this.type=="add"){
            if(this.state.shopName.length<1){
                DialogUtils.showMsg("请输入商品名称");
            }else if(this.state.shopPrice.length<1){
                DialogUtils.showMsg("请输入商品价格");
            }else if(this.state.shopNum.length<1){
                DialogUtils.showMsg("请输入商品库存");
            }else if(this.state.photos.length<1){
                DialogUtils.showMsg("请选择商品照片");
            }else{
                this.addShop();
               // this.props.navigation.navigate('MyStore'); 
            }
        }else{
            if(this.state.shopName.length<1){
                DialogUtils.showMsg("请输入商品名称");
            }else if(this.state.shopPrice.length<1){
                DialogUtils.showMsg("请输入商品价格");
            }else if(this.state.shopNum.length<1){
                DialogUtils.showMsg("请输入商品库存");
            }else{
                this.editShop();
            }
           
        }
    }

    /**
     * 添加商品信息
     */
    addShop(){
        //alert(JSON.stringify(this.state.photos))
        let url =  BaseUrl.getAddShopUrl()
        /** sessionId   contents  file */
        HttpUtils.uploadImage(url,
            {sessionId:this.userInfo.sessionId,
                goodsName:this.state.shopName,
                goodsPrice:this.state.shopPrice,
                goodsStock:this.state.shopNum,
            },
            this.state.photos,(result)=>{
            if(result.code===1){
                DialogUtils.showMsg("添加商品成功","知道了",()=>{
                     this.props.navigation.goBack()
                });
            }else{
                DialogUtils.showToast(result.msg)
            }
        })
    }


     /**
     * 修改商品信息
     */
    editShop(){
        let url =  BaseUrl.getUpdateShopUrl()
        /** sessionId   contents  file */
        HttpUtils.uploadImage(url,
            {sessionId:this.userInfo.sessionId,
                id:this.data.item.id,
                goodsName:this.state.shopName,
                goodsPrice:this.state.shopPrice,
                goodsStock:this.state.shopNum,
            },
            this.state.photos,(result)=>{
            if(result.code===1){
                DialogUtils.showMsg("编辑商品成功","知道了",()=>{
                     this.props.navigation.goBack()
                });
            }else{
                DialogUtils.showToast(result.msg)
            }
        })
    }

    render() {
        return (
            <View style={BaseStyles.container_column}>
                <NavigationBar
                    title={this.type==="add"?"添加商品":"修改商品"}
                    navigation={this.props.navigation}
                />
                <ScrollView >
                    <View style={[BaseStyles.container_column, { backgroundColor: "#f1f1f1" }]}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                商品名称</Text>
                            <EditText
                                style={styles.itemTextInput}
                                placeholder={'请输入商品名称'}
                                defaultValue={this.state.shopName}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"default"}
                                value={this.state.shopName}
                                maxLength={12}
                                onChangeText={(text) => this.setState({ shopName: text })} />
                        </View>

                         <View style={styles.itemView}>
                            <Text style={styles.itemText}>
                                商品价格</Text>
                            <TextInput
                                style={[styles.itemTextInput,{width:60}]}
                                placeholder={'请输入价格'}
                                defaultValue={this.state.shopPrice+""}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"numeric"}
                                maxLength={12}
                                value={this.state.shopPrice+""}
                                onChangeText={(text) => {
                                    this.setState({ shopPrice: Utils.chkPrice(text) })}} 
                                />
                                <Text style={[styles.itemText,{marginLeft:10}]}>
                                元</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}>库存数量</Text>
                            <TextInput
                                style={[styles.itemTextInput,{width:60}]}
                                placeholder={'请输入库存数量'}
                                placeholderTextColor={'#999'}
                                underlineColorAndroid='transparent'
                                keyboardType={"numeric"}
                                maxLength={12}
                                value={this.state.shopNum+""}
                                onChangeText={(text) => {
                                    const newText = text.replace(/[^\d]+/, '0')
                                    this.setState({ shopNum: newText })}} />
                                 <Text style={[styles.itemText,{marginLeft:10}]}>件</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10}}>
                            <Text style={{ alignSelf: "center", color: '#333',fontSize: 14,}}> *请点击下图上传商品图片</Text>
                        </View>
                        <View style={[styles.itemView,{flex:1}]}>
                        <TouchableOpacity
                         onPress={() => this.handleAsyncSelectPhoto(false, false)}><Image
                         style={{flex:1,width:240,height:170,backgroundColor:"#fff"}}
                         source={this.state.shopImage}/></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                height: 45, marginTop: 30,marginLeft: 15,
                                marginRight: 15, marginBottom: 50, borderRadius: 8,
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: mainColor,
                            }} onPress={() => this.onClicks("add")}>
                            <Text style={{alignSelf: "center",color: '#FFF', fontSize: 20,}}>确认{this.type==="add"?"添加":"修改"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
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
        marginTop: 0.5
    },
    itemText: {
        fontSize: 16, color: "#333", width: 80
    },
    itemTextInput: {
        height: 35, flex: 1, fontSize: 16, color: '#333',backgroundColor: "#fff",padding:5,
        borderWidth: 0.5,borderColor: "#ccc",
    }
});