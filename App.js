import AppNavigator from './js/navigators/AppNavigator'
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import AppStore from './js/AppStore';
import codePush from "react-native-code-push";

const stores ={
    AppStore,
} 
 class App extends Component {
    render() {
        return (
            //配置mobx 的 Store 
            <Provider {...stores}>
                <AppNavigator/>
            </Provider>
        )}
}

//export default AppNavigator
// 关闭指定警告
console.ignoredYellowBox = [ 'Warning: isMounted(...)','Warning: Failed prop type' ];
// 关闭全部的警告
//console.disableYellowBox = true;


//必须配置以下代码否则重启app回到上一个版本
let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
let codePushApp = codePush(codePushOptions)(App);
export default codePushApp;
