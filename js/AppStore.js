import { observable, computed, action, autorun } from "mobx";

class  AppStore{

    @observable userInfo; //用户信息
    @action 
    setUserInfo(userInfo){
        var cangkuNum = userInfo.cangkuNum
        var fengmiNum = userInfo.fengmiNum
        userInfo.cangkuNum = new Number(cangkuNum).toFixed(2)
        userInfo.fengmiNum = new Number(fengmiNum).toFixed(2)
        this.userInfo = userInfo;
    }
    //屏幕宽高
    width = require('Dimensions').get('window').width
    height = require('Dimensions').get('window').height
    
}

export default new AppStore()