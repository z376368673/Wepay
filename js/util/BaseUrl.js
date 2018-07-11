const url = 'http://192.168.0.105:8080/wepay'

export default class BaseUrl {

    /**
     * 登陆接口
     * 
     * @param {*} phone 
     * @param {*} pwd 
     * 
     * @return 
            "userid": 26536,
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
     */
    static loginUrl(phone, pwd) {
        return url + "/user/login?account=" + phone + "&password=" + pwd
    }

    /**
     * 2.获取首页轮播图
     * 
     * @return 数组   
     *       "id": 3,
             "pic": "u=1611874237,1149893887&fm=200&gp=0.jpg",
             "gotoUrl": "
     */
    static getBanner() {
        return url + "/user/getBanner"
    }

   /**
    * 
    * 获取用户信息
    * 
    * @param {*} sessionId 
    * @return   "userid": 26536,
            "account": "13923044417",
            "mobile": "13923044417",
            "username": "刘丶丶",
            "sessionId": "07978ff98dc14660a42a751ca4145c70",
            "userCredit": 5, 用户星级
            "useGrade": 0,
            "imgHead": "http://tz.hxksky.com/wepay/upload/toux-icon.png",
            "isReward": 1,  //0->未领取奖金,1->已经领取积分释放
            "walletAdd": "41QdCdW46NNV0Ymm3zmzTyghUe16v0a0cP",//钱包地址
            "cangkuNum": 14.2282,   //余额
            "fengmiNum": 501.996,   //积分
            "todayReleas": 1.004

    */
    static getUserInfoBy(sessionId) {
        return url + "/user/getIndexUser?sessionId="+sessionId
    }

    /**
     * 修改用户昵称
     * @param {*} sessionId 
     * @param {*} userName 
     * 
     * @return  1 
     */
    static updateUserName(sessionId,userName) {
        return url + "/user/updateUserName?sessionId="+sessionId+"&userName="+userName;
    }

}

