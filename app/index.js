import AV from 'leancloud-storage';
import React from 'react';
import {
    Navigator,
    BackAndroid,
    View,NativeAppEventEmitter
} from 'react-native';
import GuidePage from './Interactivity/guide/GuidePage.js';
import {
    Provider
} from 'react-redux';
import configureStore from './Store/index';
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import NotificationService from './Service/NotificationService';
let store = configureStore();

/*
 *启动导航，默认先启动导航页面
 *@author Anytime
 *@version 1.0
 */
const appId = 'BJWX2iY42lTLwJdyl2WMvO0q-gzGzoHsz';
const appKey = '2qqOXjs8rtdzUWbaR51HuMFt';
AV.init({
    appId,
    appKey
});


export default class AtAufe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            store: configureStore(() => (this.setState({
                isLoading: false
            }))),
        };


    }




    render() {
        const defaultName = 'GuidePage';
        const defaultComponent = GuidePage;

        if (this.state.isLoading) {
            return <View></View>;
        } else {


                return ( <Provider store={this.state.store}>
                        <Navigator initialRoute={{name: defaultName, component: defaultComponent}}
                                   configureScene={() => ({
                                       ...Navigator.SceneConfigs.HorizontalSwipeJumpFromRight, // 动画
                                       gestures: {
                                           pop: false
                                       },
                                   })
                                   }
                                   renderScene={
                                       (route, navigator) => {
                                           const Component = route.component;
                                           return ( <Component {...route.params} navigator={navigator}  />);
                                       }
                                   }
                        /></Provider>
                );
        }
    }
}
