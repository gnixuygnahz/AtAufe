import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet,View,Platform,BackAndroid,ToastAndroid,StatusBar,Alert,AppState } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AppInitSerice from './../../Service/AppInitService';
import KebiaoPage from './../kebiao/KebiaoPage';
import CloudMainTabBar from './CloudMainTabar';
import CloudMainTabBar2 from './CloudMainTabar2';
import MyPage from './../my/MyPage';
import MorePage from './../more/MorePage';
import FirstPage from './../firstpage/FirstPage';
import CommunityPage from './../community/CommunityPage';
import { connect } from 'react-redux';

import AV from 'leancloud-storage';
import { addOfflineMessage,addOnlineMessage } from './../../Actions/message';
import { setUserInfo,setImClient } from './../../Actions/app';
import UserService from './../../Service/UserService';
import NotificationService from './../../Service/NotificationService';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

let notification =new NotificationService();
const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        backgroundColor: '#ECECEC',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    bottom: {
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        paddingTop: 5,
        overflow:"visible"
    },
});

let notificationService=new NotificationService();
class MainPage extends Component {

    constructor () {
        super();
        this.pageIndex=0;
    }

    componentDidMount() {
        const { dispatch,conversations,navigator  } = this.props;

        NotificationService.configureLocalPush();//配置本地推送
        notification.initRealtime(dispatch,conversations,navigator);//运行即时消息监听器
        NotificationService.unmountJpush();//先清除上次服务的监听器
        NotificationService.initJpush();//运行极光推送服务


        this._onBackAndroid=this.onBackAndroid.bind(this);
        let page=this;
        if (Platform.OS === 'android') {

            BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
        }

        UserService.userInit();


    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {

            BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid);
        }
        notification.unmountRealtime();//停止即时通讯服务
        //结束后并不停止停止极光推送服务
    }

    onBackAndroid(){
        const nav = this.props.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }else{
            if(this.pageIndex!=1){
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= new Date().getTime()) {
                //最近2秒内按过back键，可以退出应用。
                if (Platform.OS === 'android') {
                    BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid);
                    return false;
                }
            }else{
                    this.lastBackPressed = new Date().getTime();
                    ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
                    return true;
            }
        }else{

            if(this.refs.webview.canGoBack){
                this.refs.webview.goBack();
                return true;
            }else{
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= new Date().getTime()) {
                    //最近2秒内按过back键，可以退出应用。
                    if (Platform.OS === 'android') {
                        BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid);
                        return false;
                    }
                }else{
                    this.lastBackPressed = new Date().getTime();
                    ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
                    return true;
                }
            }

        }
        }
    }



    render() {
        return (


            <ScrollableTabView
                initialPage={0}
                locked={true}
                scrollWithoutAnimation={true}
                tabBarPosition="bottom"
                style={{overflow:"visible"}}
                renderTabBar={() => <CloudMainTabBar style={styles.bottom} myPage={this} tabText={['首页','发现','课表','功能','我的']}/>}
            >

                <View
                    tabLabel="ios-paper"
                    style={{flex:1}}
                ><FirstPage navigator={this.props.navigator}></FirstPage>

                </View>
                <View
                    tabLabel="ios-people"
                    style={{flex:1}}
                ><CommunityPage ref="webview" style={{backgroundColor: AppColor.backgroundColor,flex:1}}/></View>
                <View
                    tabLabel="ios-chatboxes"
                    style={{flex:1}}
                ><KebiaoPage  navigator={this.props.navigator}/></View>
                <ScrollView
                    style={{backgroundColor:AppColor.backgroundColor}}
                    tabLabel="ios-notifications"
                ><MorePage  navigator={this.props.navigator} /></ScrollView>
                <View
                    style={{backgroundColor:AppColor.backgroundColor,flex:1}}
                    tabLabel="ios-list"
                ><MyPage navigator={this.props.navigator} /></View>
            </ScrollableTabView>

        );
    }
}
function select(store) {
    return {
        unReadNum: store.messageStore.unReadNum,
        conversations: store.messageStore.conversation
    }
}

export default connect(select)(MainPage);

{/**/}