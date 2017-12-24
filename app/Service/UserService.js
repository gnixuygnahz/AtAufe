/**
 * Created by anytime on 16/9/13.
 */
import ImageResizer from 'react-native-image-resizer';
import AV from 'leancloud-storage';
import AppInitSerice from './AppInitService';

export default class UserService {
    static updateHeadimg(zh, skey, path, finished, failed) {
        ImageResizer.createResizedImage(path, 200, 200, 'JPEG', 80).then((resizedImageUri) => {
            // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
            var RNFS = require('react-native-fs');
            RNFS.readFile(resizedImageUri.replace('file:', ''), 'base64')
                .then((result) => {
                    fetch('https://nmdim.leanapp.cn/app/postheadimg', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: '{"zh":"' + zh + '","skey":"' + skey + '","dataBase64":"' + ((result.replace(/=/g,'#a1#')).replace(/\//g,'#a2#')).replace(/\+/g,'#a3#')+'"}'
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.status == 0) {
                                AV.User.current().fetch().then(function () {
                                    finished();
                                });
                            } else {
                                failed('上传错误:' + responseJson.errMsg + responseJson.status);
                            }
                        })
                        .catch((error) => {
                            failed('网络错误');
                            console.error(error);
                        });
                })
                .catch((err) => {
                    failed('程序内部错误');
                    //console.log(err);
                });
        }).catch((err) => {
            failed(err);
        });


    }

    static userInit(){
        //console.log("action:userInit");
        let realm = AppInitSerice.getRealm();
        let user = AV.User.current();
        if(user){
            var query = user.followeeQuery();
            query.include('followee');
            query.find().then(function(followees){
                realm.write(() => {
                    realm.delete(realm.objects('Followee'));
                });
                realm.write(() => {
                    for(let i=0;i<followees.length;i++){
                        realm.create('Followee', {
                            id: followees[i].getObjectId(),
                            petName: followees[i].get('petName'),
                            headimg: followees[i].get('headimg'),
                        });
                        //console.log("add"+followees[i].getObjectId());
                    }
                });
            });

            var query2 = user.relation('collection').query();
            query.find().then(function (results) {
                realm.write(() => {
                    realm.delete(realm.objects('Collection'));
                });
                realm.write(() => {
                    for(let i=0;i<results.length;i++){
                        realm.create('Collection', {
                            id: results[i].getObjectId(),
                            title: results[i].get('title'),
                            headimg: '',
                        });
                        //console.log("add:"+results[i].getObjectId());
                    }
                });
            }, function (error) {
            });
        }
    }

    static updateUserInfo(data, finished, failed) {
        var currentUser = AV.User.current();
        if (currentUser) {
            currentUser.set('petName', data.petName);
            currentUser.set('signature', data.signature);
            currentUser.set('profile', data.profile);
            currentUser.set('headimg', data.headimg);
            currentUser.set('opXueHao', data.opXueHao);
            currentUser.set('opName', data.opName);
            currentUser.set('opSex', data.opSex);
            currentUser.set('opXueYuan', data.opXueYuan);
            currentUser.set('opZhuanYe', data.opZhuanYe);
            currentUser.set('opBanJi', data.opBanJi);
            currentUser.set('opKeCheng', data.opKeCheng);
            currentUser.save().then(function (user) {
                finished();
            }, function (err) {
                failed(err.code);
            });
        } else {
            failed('未登录');
        }
    }

    static loginOut(){
        AV.User.logOut();
        let realm = AppInitSerice.getRealm();
        realm.write(() => {
            realm.delete(realm.objects('Course'));
            realm.delete(realm.objects('Followee'));
            realm.delete(realm.objects('Collection'));
            realm.delete(realm.objects('History'));
        });
    }

    static attent(artObjId){
        var currentUser = AV.User.current();
        if (currentUser) {

        }
    }

    static getOthers(userId, finished, failed){
        fetch('https://nmdim.leanapp.cn/app/getOthers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"userId":"' + userId + '"}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 0) {

                    finished(responseJson.errMsg);

                } else {
                    failed('错误:' + responseJson.errMsg + responseJson.status);
                }
            })
            .catch((error) => {
                failed('网络错误');
                console.error(error);
            });
    }
}
