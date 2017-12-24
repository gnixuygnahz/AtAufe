import React, { Component } from 'react';
import { StatusBar, View, Image, Dimensions ,Alert,
    Platform} from 'react-native';
import { connect } from 'react-redux';
import MainPage from './../main/MainPage.js';
import LoginPage from './../login/LoginPage.js';
import GuideCon from './GuideCon';
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
// 图片资源
//const guideImg = require('./../../Asset/guide/img/guide.png');
const guideImg = require('./AtAufe.jpg');
// 尺寸资源
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
let guide = {}; // 初始化控制器
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');


import _updateConfig from './../../../update.json';
/*
 导航页面
 */
class GuidePage extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
    };

    componentDidMount() {
        guide = new GuideCon(this);


        const page =this;


        if (isFirstTime) {
            markSuccess();
        }





        if(__DEV__){
            guide.init();
        }else{
            const {appKey} = _updateConfig[Platform.OS];
            const timeoutMs = 1000; // 两秒后强制进入,不等待更新
            setTimeout(() => {
                guide.init();
            }, timeoutMs);

            checkUpdate(appKey).then(info => {
                if (info.expired) {
                    Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                        {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                    ]);
                    //guide.init();
                } else if (info.upToDate) {
                    //guide.init(); // 初始化事件
                } else {
                    // Alert.alert('提示', '主人,,,,检查到新的更新包'+info.name+',是否更新?\n'+ info.description, [
                    //     {text: '是', onPress: ()=>{page.showLoading();page.doUpdate(info)}},
                    //     {text: '否',onPress:()=>{guide.init();}},
                    // ]);
                    page.showLoading();page.doUpdate(info);
                }

            }).catch(err => {
                Alert.alert('提示', '网络异常~~~');
                //guide.init();
            });
        }

        var PushNotification = require('react-native-push-notification');

        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });



    }
    doUpdate (info) {
        downloadUpdate(info).then(hash => {
            switchVersion(hash);
        }).catch(err => {
            Alert.alert('提示', '更新失败,,,,,,失败原因:'+err);
        });
    };

    jumpToLogin() { // 跳转LoginPage行为
        if (this.props.navigator) {
            this.props.navigator.push({
                name: 'LoginPage',
                component: LoginPage,
            });
        }
    }

    xAlert(){
        Alert.alert('提示', '网络异常');
    }

    jumpToMain() { // 跳转Main行为
        if (this.props.navigator) {
            this.props.navigator.resetTo({
                name: 'MainPage',
                component: MainPage,
            });
        }
    }

    showLoading(){
        loaderHandler.showLoader("Loading");
    }

    hideLoading(){
        loaderHandler.hideLoader();
    }
    render() {
        return (
            <View style={{ width: deviceWidth, height: deviceHeight }}>
                <StatusBar
                    hidden={true}
                />
                <View style={{ width: deviceWidth, height: deviceHeight , alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={guideImg}
                        style={{ width: deviceWidth, height: deviceHeight }}
                    />
                </View>
                <BusyIndicator style={{zIndex:999}}/>
            </View>
        );
    }

}
function select(store) {
    return {
    }
}

export default connect(select)(GuidePage);