import { observable, computed, action, autorun } from "mobx";

class  AppStore{

    @observable userInfo; //用户信息
    @action 
    setUserInfo(userInfo){
        this.userInfo = userInfo;
    }
    //屏幕宽高
    width = require('Dimensions').get('window').width
    height = require('Dimensions').get('window').height
    
}

export default new AppStore()