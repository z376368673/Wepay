
import { AsyncStorage } from 'react-native';
import DialogUtils from '../util/DialogUtils';

export default class AsySorUtils{
    
/**
 * user信息
 * @param {*} info 
 */
saveUser(info){
    AsyncStorage.setItem('userInfo',JSON.stringify(info),(error)=>{
        if (error) {
            DialogUtils.showToast("保存异常"+error.message)
        } else{
            console.log("save userInfo is ")
        }
    });
}

getUser(){
    AsyncStorage.getItem('userInfo',(error,result)=>{
        if (!error) {
            console.log(result);
            return JSON.parse(result);
        }else{
            return undefined;
        }
    })
}
}