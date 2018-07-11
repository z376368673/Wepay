
import { AsyncStorage } from 'react-native';
import DialogUtils from '../util/DialogUtils';

export default class AsySorUtils{
    
/**
 * user信息   "userid": 26536,
        "account": "13923044417",
        "mobile": "13923044417",
        "username": "刘丶丶",
        "sessionId": "07978ff98dc14660a42a751ca4145c70",
        "userCredit": 5,
        "useGrade": 0,
        "imgHead": "http://tz.hxksky.com/wepay/upload/toux-icon.png",
        "isReward": 1,
        "walletAdd": "41QdCdW46NNV0Ymm3zmzTyghUe16v0a0cP",
        "cangkuNum": 14.2282,
        "fengmiNum": 501.996,
        "todayReleas": 1.004
 * @param {*} info 
 */
static saveUser(info,callback){
    AsyncStorage.setItem('userInfo',JSON.stringify(info),(error)=>{
        if (error) {
            DialogUtils.showToast("保存异常"+error.message)
            callback()
        } else{
            callback(info)
        }
    });
}

static getUser(callback){
    AsyncStorage.getItem('userInfo',(error,result)=>{
        if (!error) {
            callback(JSON.parse(result))
        }else{
            callback(undefined) ;
        }
    })
}
}