const url = 'http://192.168.0.105:8081/wepay'

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
     *  获取设置界面是否有新消息  其他字段几乎没用
     *  
     * @returns
        1	code	是	状态码 
        2	msg	是	错误信息
        3	data	是	数据(code=1返回数据)
        3.1	userid		用户id
        3.2	mobile		手机号/账号
        3.3	username		用户名
        3.4	userCredit		用户星级
        3.5	imgHead		头像网络地址
        3.6	newMessage		是否有新消息1.是，0.否
     * @param {*} sessionId 
     */
    static getuserInfoUrl(sessionId) {
        return url + "/user/userCenter?sessionId=" + sessionId;
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
        return url + "/user/getIndexUser?sessionId=" + sessionId
    }

    /**
     * 修改用户昵称
     * @param {*} sessionId 
     * @param {*} userName 
     * 
     * @return  1 
     */
    static updateUserName(sessionId, userName) {
        return url + "/user/updateUserName?sessionId=" + sessionId + "&userName=" + userName;
    }
    /**
     * 获取验证码
     * @param {*} mobile 
     * @returns     "code": 1,
                    "msg": "",
                    "data": 537461
     */
    static getVerificationCodeUrl(mobile) {
        return url + "/user/sendCode?mobile=" + mobile
    }
    /**
     * 用户注册
     *  
     * POST
     * @param {*} mobile 
     * @param {*} username 用户昵称
     * @param {*} referrer 推荐人UID/手机号
     * @param {*} loginPwd 登录密码
     * @param {*} safetyPwd 交易密码
     * @return  1 
     */
    static getRegisterUrl() {
        return url + "/user/register"
    }

    /**
     * 用户上传头像url 
     * POST
     * 
     * sessionId	是	token	String
     * file	是	File图片文件	file
     */
    static getUpdataHeadUrl() {
        return url + "/user/updateImgHead"
    }
    /**
      * 提交建议的 url 
      * POST
      * 
      * sessionId	是	token	            String
      * file	    是	File图片文件	      file
      * contents	是	投诉内容（100字以内）	String
      */
    static getComplaintUrl() {
        return url + "/opinions/add"
    }

    /**
     * 忘记密码
     * 
     * POST
     * @param {*} mobile 
     * @param {*} newPwd 
     * @return  1 
     */
    static getForgotPwdUrl() {
        return url + "/user/forgotPwd"
    }
    /**
     * 忘记支付密码
     * 
     * POST
     * @param {*} mobile 
     * @param {*} newPwd 
     * @return  1 
     */
    static getForgotPayPwdUrl() {
        return url + "/user/forgotPayPwd"
    }

    /**
     * 修改支付密码
     *  
     * POST
     * @param {*} sessionId 
     * @param {*} oldPwd 旧密码
     * @param {*} newPwd 新密码
     * @return  1 
     */
    static getUpdatePayPwdUrl() {
        return url + "/user/updatePayPwd"
    }

    /**
   * 修改登录密码
   *  
   * POST
   * @param {*} sessionId 
   * @param {*} oldPwd 旧密码
   * @param {*} newPwd 新密码
   * @return  1 
   */
    static getUpdateLoginPwdUrl() {
        return url + "/user/updateLoginPwd"
    }

    /**
    * 获取银行卡列表
    * @param {*} sessionId 
    * @return  
    *     "id": 58,
           "cardId": 3,
           "userId": 3058,
           "isDefault": 0,
           "addTime": "1524528135",
           "holdName": "杨稳",
           "cardNumber": "6222084000007207445",
           "openCard": "中国工商银行兴东支行",
           "banqGenre": "中国工商银行",
           "banqImg": "http://tz.hxksky.com/wepay/upload/zggsyh.png"
    */
    static getUserBankListUrl(sessionId) {
        return url + "/bank/userBank?sessionId=" + sessionId;
    }
    /**
     * 删除银行卡
     * 
     * @param {*} sessionId 
     * @param {*} id 
     * @returns  code 1 
     */
    static delBankCardUrl(sessionId, id) {
        return url + "/bank/deleteBank?sessionId=" + sessionId + "&id=" + id;
    }
    /**
    * 添加银行卡
    * @param {*} sessionId 
    * @param {*} cardId 银行类型id
    * @param {*} holdName 持卡人姓名
    * @param {*} openCard 开户支行
    * @param {*} cardNumber 银行卡号
    * 
    */
    static addBankCardUrl(sessionId, cardId, holdName, openCard, cardNumber) {
        return url + "/bank/addBank?sessionId=" + sessionId + "&cardId=" + cardId + "&holdName=" + holdName + "&openCard=" + openCard + "&cardNumber=" + cardNumber;
    }
    /**
     * 银行类型列表
     *  @return    "pid": 3, //暂时没用 只要用qid
                    "banqGenre": "中国工商银行",
                    "banqImg": "http://tz.hxksky.com/wepay/upload/zggsyh.png",
                    "qid": 3

     */
    static getBankListUrl() {
        return url + "/bank/bankNameList"
    }

    /**
     * 获取系统公告列表
     * 
     * @param {*} sessionId 
     * @param {*} pageIndex 分页码 
     * @returns
     *  "id": 90,
        "title": "众筹公告1",
        "addtime": 1526389977
     */
    static getSystemNews(sessionId, pageIndex) {
        return url + "/news/list?sessionId=" + sessionId + "&pageIndex=" + pageIndex;
    }
    /**
     * 获取系统公告详情
     * @param {*} sessionId 
     * @param {*} id 
     * @returns 
     * "id": 90,
     * "title": "11",
     * "addtime": 1526389977,
     * "content": "11"
     */
    static getSystemgNewsDetails(sessionId, id) {
        return url + "/news/detail?sessionId=" + sessionId + "&id=" + id;
    }


    /**
    * 获取个人消息列表
    * @param {*} sessionId 
    * @param {*} id 
    * @returns 
    *  "id": 10,
       "sendName": "平台",             发送人名称
       "receiverUid": 26536,           接受者id
       "content": "测试", 内容
       "title": "平台向用户发送消息9",      标题
       "createTime": 1531297710,           发送时间
       "status": 1    未读：0，已读：1
    */
    static getNews(sessionId, pageIndex) {
        return url + "/message/list?sessionId=" + sessionId + "&pageIndex=" + pageIndex;
    }

    /**
    * 获取个人消息详情
    * @param {*} sessionId 
    * @param {*} id 
    * @returns 
    *  "id": 10,
       "sendName": "平台",             发送人名称
       "receiverUid": 26536,           接受者id
       "content": "测试", 内容
       "title": "平台向用户发送消息9",      标题
       "createTime": 1531297710,           发送时间
       "status": 1    未读：0，已读：1
    */
    static getNewsDetails(sessionId, id) {
        return url + "/message/detail?sessionId=" + sessionId + "&id=" + id;
    }

    /**
        * 获取收货地址列表
        * @param {*} sessionId 
        * @param {*} id 
        * @returns 
                "addressId": 36,
                "memberId": "1870",
                "name": "阮先生",
                "telephone": "18975978788",
                "address": "城东南工业园高速公路桥底顺风洗车",
                "cityId": "邵阳市",
                "countryId": "隆回县",
                "provinceId": "湖南",
                "zt": 1
        */
    static getAddressList(sessionId) {
        return url + "/address/list?sessionId=" + sessionId
    }

    /**
     * 删除银行卡
     * 
     * @param {*} sessionId 
     * @param {*} addressId 
     * @returns  code 1 
     */
    static delAddressUrl(sessionId, addressId) {
        return url + "/address/delete?sessionId=" + sessionId + "&addressId=" + addressId;
    }

    /**
     * 添加地址
     * 
     * @param {*} sessionId 
     * @param {*} memberId   用户id
     * @param {*} name 
     * @param {*} telephone    电话号
     * @param {*} provinceId   省
     * @param {*} cityId       市
     * @param {*} countryId   区/县
     * @param {*} address   详细地址
     * @param {*} zt 
     */
    static putAddress(sessionId, memberId, name, telephone, provinceId, cityId, countryId, address, zt) {
        return url + "/address/add?sessionId=" + sessionId
            + "&memberId=" + memberId
            + "&name=" + name
            + "&telephone=" + telephone
            + "&provinceId=" + provinceId
            + "&cityId=" + cityId
            + "&countryId=" + countryId
            + "&address=" + address
            + "&zt=" + zt;
    }

    /**
      * 编辑地址
      * 
      * @param {*} sessionId 
      * @param {*} addressId   地址id
      * @param {*} memberId   用户id
      * @param {*} name 
      * @param {*} telephone    电话号
      * @param {*} provinceId   省
      * @param {*} cityId       市
      * @param {*} countryId   区/县
      * @param {*} address   详细地址
      * @param {*} zt 
      */
    static editAddress(sessionId, addressId, memberId, name, telephone, provinceId, cityId, countryId, address, zt) {
        return url + "/address/update?sessionId=" + sessionId
            + "&addressId=" + addressId
            + "&memberId=" + memberId
            + "&name=" + name
            + "&telephone=" + telephone
            + "&provinceId=" + provinceId
            + "&cityId=" + cityId
            + "&countryId=" + countryId
            + "&address=" + address
            + "&zt=" + zt;
    }


    /**
     * 转出-获取转入用户的信息
     * 
     * @param {*} sessionId 
     * @param {*} account  对方账户 手机号
     * 
     * @returns
     *  1	code	是	状态码 
        2	msg	    是	错误信息
        3	data	是	数据(code=1返回数据)
        3.1	userid		    用户id
        3.2	mobile		    手机号
        3.3	username		用户名
        3.4	userCredit		用户星级
        3.5	imgHead		    头像地址
        3.6	newMessage		暂时没用
     */

    static getUserBy(sessionId,account) {
        return url + "/tranMoney/getUser?sessionId=" + sessionId+"&account="+account
    }


   /**
     * 转出-余额转出
     * POST
     * @param {*} sessionId 
     * @param {*} payId   支付会员id
     * @param {*} getId   收入方id
     * @param {*} getNums    转出数 
     * @param {*} mobile   手机后4位
     * @param {*} safetyPwd       交易密码
     * 
     * @returns code 1,0
     */
    static tranOutMoney() {
        return url + "/store/outMoney"
    }


    /**
     * 获取转出-获取转出记录
     * @param {*} sessionId 
     * @param {*} pageIndex 
     *  // 1	code	是	状态码 
        // 2	msg	是	错误信息
        // 3	data	是	数据(code=1返回集合数据)
        // 3.1	id		转出记录id
        // 3.2	payId		支付人id
        // 3.3	getId		对方id
        // 3.4	getNums		转账总金额
        // 3.5	getTime		转账时间
        // 3.6	getType		类型 0-转账
        // 3.7	username		对方用户名
        // 3.8	imgHead		对方头像（需要添加前缀如：如http://tz.hxksky.com/wepay/upload/
     */
    static getOutRecord(sessionId, pageIndex) {
        return url + "/tranMoney/outRecord?sessionId=" + sessionId
            + "&pageIndex=" + pageIndex;
    }
    /**
     * 转入-获取转入记录
     * 
     * @param {*} sessionId 
     * @param {*} pageIndex 
     * 返回参数与转出一样
     */
    static getInRecord(sessionId, pageIndex) {
        return url + "/tranMoney/inRecord?sessionId=" + sessionId
            + "&pageIndex=" + pageIndex;
    }


    /**
     * 积分兑换
     * @param {*} sessionId 
     * @param {*} exchangeMoney 需要兑换余额 
     * @param {*} safetyPwd 交易密码 
     * 请求方式:POST
     */
    static creditsExchange() {
        return url + "/store/creditsExchange?" 
    }

    /**
     * 积分记录
     * @param {*} sessionId 
     * @param {*} pageIndex 
     */
    static getExchangeRecordJ(sessionId, pageIndex) {
        return url + "/tranMoney/exchangeRecord?sessionId=" + sessionId
            + "&pageIndex=" + pageIndex;
    }
    /**
     * 余额记录
     * @param {*} sessionId 
     * @param {*} pageIndex 
     */
    static getExchangeRecordY(sessionId, pageIndex) {
        return url + "/tranMoney/exchangeRecord?sessionId=" + sessionId
            + "&pageIndex=" + pageIndex;
    }


    /**
     * 卖出-创建卖出订单
     * 
     * POST
     * 
     * @param:
     * sessionId	是	token	String
     * exchangeMoney 是	需要卖出余额	int
     * safetyPwd     是	交易密码	String
     * describe     是	描述	String
     * bankId      是	银行卡id	int
     */
    static createOutOrder() {
        return url + "/trans/createOutOrder";
    }


}

