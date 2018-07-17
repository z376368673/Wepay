import React from 'react'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import Welcome from '../page/Welcome'
import HomePage from "../page/HomePage";
import SettingView from "../page/setting/SettingView";
import SaoSaoView from "../page/SaoSaoView";
import ZhuanRu from "../page/ZhuanRu";
import ZhuanChu from "../page/ZhuanChu";
import BuyPage from "../page/BuyPage";
import SellPage from "../page/SellPage";
import ExcIntegral from "../page/ExcIntegral";
import YueOrIntegralRecord from "../page/YueOrIntegralRecord";
import BuyOrSellCentre from "../page/BuyOrSellCentre";
import BuyOrSellRecord from "../page/BuyOrSellRecord";
import BuyOrSellUnfinishedOrder from "../page/BuyOrSellUnfinishedOrder";
import ModifyNickName from "../page/setting/ModifyNickName";
import BankCardList from "../page/setting/BankCardList ";
import AddBankCard from "../page/setting/AddBankCard";
import SharePage from "../page/setting/SharePage";
import ModifyPassWord from "../page/setting/ModifyPassWord";
import ForgetPassWord from "../page/setting/ForgetPassWord";
import NoticeList from "../page/setting/NoticeList";
import NoticDetails from "../page/setting/NoticDetails";
import MyNoticDetails from "../page/setting/MyNoticDetails";
import MyNoticeList from "../page/setting/MyNoticeList";
import AddressList from "../page/setting/AddressList";
import EditAddress from "../page/setting/EditAddress";
import Complaint from "../page/setting/Complaint";
import RegisterPage from "../page/setting/RegisterPage";
import LoginPage from "../page/setting/LoginPage";
import ApplyStore from "../page/store/ApplyStore";
import MyStore from "../page/store/MyStore";
import AddShop from "../page/store/AddShop";
import StoreMall from "../page/store/StoreMall";
import StoreDetails from "../page/store/StoreDetails";
import MyStoreOrder from "../page/store/MyStoreOrder";
import MyOrder from "../page/setting/MyOrder";


export default AppNavigator = createStackNavigator({
   

    LoginPage: {//登陆
        screen: LoginPage
    },
    
    AddBankCard: {//添加银行卡
        screen: AddBankCard
    },

    HomePage: {//首页
        screen: HomePage
    },
   
    SettingView: {//设置
        screen: SettingView
    },
    StoreMall: {//商城首页
        screen: StoreMall
    },
    MyOrder: {//我的订单
        screen: MyOrder
    },
    MyStoreOrder: {//店铺订单
        screen: MyStoreOrder
    },
    
    SharePage: {//分享好友
        screen: SharePage
    },
   
    StoreDetails: {//商品详情
        screen: StoreDetails
    },
    AddShop: {//添加商品
        screen: AddShop
    },
    MyStore: {//我的店铺
        screen: MyStore
    },
   
    RegisterPage: {//注册
        screen: RegisterPage
    },

    YueOrIntegralRecord: {// 余额,积分记录
        screen: YueOrIntegralRecord
    },
    BuyOrSellRecord: {// 买入/卖出记录
        screen: BuyOrSellRecord
    },
    BuyOrSellUnfinishedOrder: {// 买入/卖出 未完成订单
        screen: BuyOrSellUnfinishedOrder
    },

    ZhuanRu: { //转入
        screen: ZhuanRu
    },
    ZhuanChu: {//转出
        screen: ZhuanChu
    },
    ExcIntegral: {//兑换积分
        screen: ExcIntegral
    },

    BuyPage: { //买入
        screen: BuyPage
    },
    SellPage: { //卖入
        screen: SellPage
    },

    BuyOrSellCentre: { //买入\卖出中心
        screen: BuyOrSellCentre
    },

    SaoSaoView: {//扫一扫界面
        screen: SaoSaoView
    },
    ModifyNickName: {//修改昵称
        screen: ModifyNickName
    },
    BankCardList: {//我的银行卡
        screen: BankCardList
    },
  
   

    ModifyPassWord: {//修改 登陆/支付 密码
        screen: ModifyPassWord
    },
    ForgetPassWord: {//忘记 登陆/支付 密码
        screen: ForgetPassWord
    },
    NoticeList: {//公告消息列表
        screen: NoticeList
    },
    MyNoticeList: {//个人消息列表
        screen: MyNoticeList
    },
    NoticDetails: {//公告详情
        screen: NoticDetails
    },
    MyNoticDetails: {//个人消息详情
        screen: MyNoticDetails
    },
    AddressList: {//地址管理
        screen: AddressList
    },
    EditAddress: {//编辑地址
        screen: EditAddress
    },
    Complaint: {//投诉建议
        screen: Complaint
    },

    ApplyStore: {//店铺申请认证
        screen: ApplyStore
    },
    
    Welcome: {//欢迎页 
        screen: Welcome
    },
    
}, {
    navigationOptions: {
        header: null
    }
})

// export  const HomeTabNavigator = createBottomTabNavigator({
//     One:PageOne,
//     Two:PageTwo,
//     Three:PageThree,
//     Four:PageFour,
// },{
//     navigationOptions: ({ navigation }) => ({
//         headerMode: 'none',
//         tabBarIcon: ({ focused, tintColor }) => {
//             const { routeName } = navigation.state;
//             let iconName;
//             if (routeName === 'One') {
//                 iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//             } else if (routeName === 'Two') {
//                 iconName = `ios-options${focused ? '' : '-outline'}`;
//             } else if (routeName === 'Three') {
//                 iconName = `ios-albums${focused ? '' : '-outline'}`;
//             } else if (routeName === 'Four') {
//                 iconName = `ios-apps${focused ? '' : '-outline'}`;
//             }
//             // You can return any component that you like here! We usually use an
//             // icon component from react-native-vector-icons
//             return <Ionicons name={iconName} size={25} color={tintColor} />;
//         },
//     }),
//     tabBarOptions: {
//         activeTintColor: 'red',
//         inactiveTintColor: '#000',
//     },
//})