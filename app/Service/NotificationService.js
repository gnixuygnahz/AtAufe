/**
 * Created by anytime on 2016/12/17.
 */
/*
触发来源：消息、推送、通知、回复、课程提醒、其他
触发途径：方法调用、延时调用、定时调用
触发效果：通知栏通知、弹出式
触发引导：跳转
**/
import AppInitService from './AppInitService';
import AV from 'leancloud-storage';
import { addOfflineMessage,addOnlineMessage } from './../Actions/message';
import { setUserInfo,setImClient } from './../Actions/app';
import {Vibration,PushNotificationIOS,Platform,DeviceEventEmitter, NativeAppEventEmitter} from 'react-native';
import Toast from 'react-native-root-toast';
import IMService from './IMService';
import JPushModule from 'jpush-react-native';

export default class NotificationService{
    constructor(){

    }

    static showMsg(msg){
        // Add a Toast on screen.
        let toast = Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });

        setTimeout(function () {
            Toast.hide(toast);
        }, 1500);
    }

    initRealtime(dispatch,conversations,navigator){

        let page = this;

        var realm = AppInitService.getRealm();

        let vibration=true;

        if(realm.objects('AppStorage').filtered('name = "MessageVibration"')==null||realm.objects('AppStorage').filtered('name = "MessageVibration"').length==0){

            realm.write(() => {
                realm.create('AppStorage', {
                    name: "MessageVibration",
                    bool:true,
                });
            });
        }else {
            let vibration=realm.objects('AppStorage').filtered('name = "MessageVibration"')[0].bool;
        }




        var Realtime = require('leancloud-realtime').Realtime;
        var realtime = new Realtime({
            appId: 'BJWX2iY42lTLwJdyl2WMvO0q-gzGzoHsz',
            region: 'cn', // 美国节点为 "us"
        });
        var currentUser = AV.User.current();
        if(currentUser){
            realtime.createIMClient(currentUser.getObjectId(), {
                signatureFactory: IMService.signatureFactory,
                conversationSignatureFactory: IMService.conversationSignatureFactory,
            }).then(function(user) {

                dispatch(setImClient(user));
                page.client=user;
                user.on('unreadmessages', function unreadMessagesEventHandler(payload, conversation) {

                    let lastTime = payload.lastMessageTimestamp.getTime();
                    let readNum = payload.count;
                    if(conversation.members.length==2){
                        let fromId=conversation.members[0]==currentUser.getObjectId()?conversation.members[1]:conversation.members[0];
                        let flat = false;
                        for(let i=0;i<conversations.length;i++){ // 节省流量
                            if(conversations[i].conversationId==conversation.id){
                                dispatch(addOfflineMessage(conversation.id,conversations[i].name,conversations[i].headimg,lastTime,readNum));
                                flat=true;
                                break;
                            }
                        };
                        if(!flat){
                            var query = new AV.Query('_User');
                            query.get(fromId).then(function (data) {
                                let headimg = data.get('headimg');
                                let name = data.get('petName');
                                dispatch(addOfflineMessage(conversation.id,name,headimg,lastTime,readNum));
                            });
                        }
                    } else {
                        dispatch(addOfflineMessage(conversation.id,conversation.name,'',lastTime,readNum));
                    }
                });
                user.on('message',function(message, conversation) {


                    let lastTime = conversation.lastMessageAt.getTime();
                    if(conversation.members.length==2){
                        let fromId=conversation.members[0]==currentUser.getObjectId()?conversation.members[1]:conversation.members[0];
                        let flat = false;
                        for(let i=0;i<conversations.length;i++){ // 节省流量
                            if(conversations[i].conversationId==conversation.id){
                                dispatch(addOnlineMessage(conversation.id,conversations[i].name,conversations[i].headimg,lastTime));
                                flat=true;
                                break;
                            }
                        };
                        if(!flat){
                            var query = new AV.Query('_User');
                            query.get(fromId).then(function (data) {
                                let headimg = data.get('headimg');
                                let name = data.get('petName');
                                dispatch(addOnlineMessage(conversation.id,name,headimg,lastTime));
                            });
                        }
                    } else {
                        dispatch(addOnlineMessage(conversation.id,conversation.name,'',lastTime));
                    }

                    if(vibration){
                        Vibration.vibrate();
                    }

                });
            }).catch(function(error) {
                NotificationService.showMsg('连接异常');
                // 如果 signatureFactory 抛出了异常，或者签名没有验证通过，会在这里被捕获
            });

            dispatch(setUserInfo(currentUser.getObjectId(),currentUser.get('petName'),currentUser.get('headimg')));
        }
    }

    unmountRealtime(){
        if(this.client){
            this.client.close();
        }
    }

    //本地push配置
    static configureLocalPush(){
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

    static initJpush(){

        var realm = AppInitService.getRealm();
        let isPsuh=true;
        if(realm.objects('AppStorage').filtered('name = "IsPush"')==null||realm.objects('AppStorage').filtered('name = "IsPush"').length==0){
            realm.write(() => {
                realm.create('AppStorage', {
                    name: "IsPush",
                    bool:true,
                });
            });
        }else {
            let isPsuh=realm.objects('AppStorage').filtered('name = "IsPush"')[0].bool;
        }

        if(isPsuh){
            if(Platform.OS=='android'){
                JPushModule.initPush();
                JPushModule.getRegistrationID((registrationId) => {

                });
                JPushModule.addReceiveCustomMsgListener((message) => {

                });
                JPushModule.addReceiveNotificationListener((map) => {

                });
                JPushModule.addReceiveOpenNotificationListener((map) => {

                })
            }else {
                JPushModule.getRegistrationID((registrationid) => {
                    console.log(registrationid);

                });
                NativeAppEventEmitter.addListener('networkDidSetup', (token) => {

                });
                NativeAppEventEmitter.addListener('networkDidClose', (token) => {

                });
                NativeAppEventEmitter.addListener('networkDidRegister', (token) => {

                });
                NativeAppEventEmitter.addListener('networkDidLogin', (token) => {

                });
            }
        }else {
            if(Platform.OS=='android'){
                JPushModule.stopPush();
            }

        }
    }

    static unmountJpush(){
        if(Platform.OS=='android'){
            JPushModule.removeReceiveCustomMsgListener();
            JPushModule.removeReceiveNotificationListener();
        }else {
            DeviceEventEmitter.removeAllListeners();
            NativeAppEventEmitter.removeAllListeners();
        }
    }



    static localNotification(){
        NotificationService.showMsg("已发送");
        var PushNotification = require('react-native-push-notification');
        PushNotification.localNotification({
            title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
            message: "My Notification Message", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }

}