/**
 * Created by anytime on 16/10/14.
 */
import AV from 'leancloud-storage';

export default class UrpServiceService {
    static getYZM(){
        var promise = new AV.Promise();
        fetch('https://nmdim.leanapp.cn/urp/getcookie', {
            method: 'GET',
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 0) {

                    promise.resolve('https://nmdim.leanapp.cn/urp/getyzm?cookie=' + responseJson.data.cookie + "&hostId=" + responseJson.data.hostId,{hostId:responseJson.data.hostId,cookie:responseJson.data.cookie});

                } else {
                    promise.reject(responseJson);
                }

            })
            .catch((error2) => {
                promise.reject(error2);
            });
        return promise;
    }

    static register(zh,pwd,yzm,config){
        var promise = new AV.Promise();
        fetch('https://nmdim.leanapp.cn/urp/register?'+'cookie='+config.cookie+'&hostId='+config.hostId+'&zh='+zh+'&pwd='+pwd+'&yzm='+yzm, {
            method: 'GET'
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status==0){
                    promise.resolve();
                }else{
                    promise.reject(responseJson);
                }
            })
            .catch((error) => {
                promise.reject(error);
            });
        return promise;
    }

    static updateUserInfo(id,skey,yzm,config){
        var promise = new AV.Promise();
        fetch('https://nmdim.leanapp.cn/urp/updateUserInfo?'+'cookie='+config.cookie+'&hostId='+config.hostId+'&userId='+id+'&skey='+skey+ '&yzm='+yzm, {
            method: 'GET'
        }).then(
            (response) => response.json()
        ).then(function (responseJson) {
            promise.resolve(responseJson);
        }).catch(function (error) {
            promise.reject(error);
        });

        return promise;
    }
}