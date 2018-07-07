const url = 'http://192.168.0.105:8080/wepay'


export default class BaseUrl{
       /**
        * 登陆接口
        * @param {*} phone 
        * @param {*} pwd 
        */
   static  loginUrl(phone,pwd){
        return url+"/user/login?account="+phone+"&password="+pwd
    }

} 

