
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import BaseComponent ,{BaseStyles}from "../page/BaseComponent";
import BankCardModel from "../model/BankCardModel";
import ViewUtils from "../util/ViewUtils";



export  default class BankCardView extends BaseComponent {
    constructor(props){
        super(props);
    }
    render() {
      const {BankCardModel} =  this.props
        return (
            <View style={{backgroundColor: "#fff",flexDirection: 'column'}}>
                {/*绑定银行卡*/}
                <View style={{flexDirection: 'column',  marginTop: 8}}>
                    <View style={{
                        flexDirection: 'row', padding: 10, backgroundColor: "#fff", alignItems: 'center'
                    }}>
                        <Text style={{color: '#999', fontSize: 18, flex: 1}}> 绑定银行卡</Text>
                        <Image
                            style={{tintColor: "#999",}}
                            source={require('../../res/images/ic_tiaozhuan.png')}/>
                    </View>
                </View>
                {ViewUtils.getLineView()}
                <View style={{flexDirection: 'column',paddingLeft:15,paddingRight:15,paddingBottom:15,paddingTop:15}}>
                    <Text style={styles.text}>{BankCardModel.userName}</Text>
                    <Text style={styles.text}>{BankCardModel.bankName}</Text>
                    <Text style={styles.text}>{BankCardModel.bankNum}</Text>
                </View>
            </View>
        );
    }
}
export const styles = StyleSheet.create({
    text: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // position:"absolute",  //绝对布局
        color:"#333333",
        fontSize:17,
        marginTop:5
    },
});


