/**
 * Created by anytime on 16/11/9.
 */
'use strict';

import {
    Alert,Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

//余额查询
//自助缴费
//购电缴费
//网络缴费
const URL="https://ykt.aufe.edu.cn";
export default class YktService {

    static cookie="";

    async getYZM(){
        if(Platform.OS=='android') {
            var res = await RNFetchBlob.fetch('GET', URL + '/checkCode.action?t=' + Math.random());
            //Alert.alert("",res.headers.get('Set-Cookie'));
            return "data:image/jpg;base64," + res.base64();
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/getcookie', {method: 'GET'});
            var res = await json.json();
            console.log(res);
            YktService.cookie=res.data;
            return 'https://nmdim.leanapp.cn/ykt/getyzm?cookie='+YktService.cookie;
        }
    }

    async login(zh,mm,yzm){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("POST", URL + '/validateYzm.action', {
                body: "checkCode=" + yzm + ""
            }, [{name: 'checkCode', data: yzm}]);
            var test1 = res1.text();
            var res = await RNFetchBlob.fetch("POST", URL + '/login.action', {
                method: "POST",
                body: "loginMode=express&username=" + zh + "&password=" + mm + "&checkCode=" + yzm + "&x=33&y=19"
            }, [{name: "loginMode", data: "express"}, {name: "username", data: zh}, {
                name: "password",
                data: mm
            }, {name: "checkCode", data: yzm}, {name: "x", data: "33"}, {name: "y", data: "19"}]);
            var test = res.text();
            //this.queryYuE();
            //this.bankTransferAmount(1);
            var bool = test.indexOf("退出系统");
            if (bool > 0) {
                return true;
            } else {
                return false;
            }
        }else{
            var json = await fetch('https://nmdim.leanapp.cn/ykt/login?cookie='+YktService.cookie+"&zh="+zh+"&pwd="+mm+"&yzm="+yzm, {method: 'GET'});
            var res=await json.json();
            console.log(YktService.cookie);
            if (res.status == 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    //查询校园卡余额
    async queryYuE(){
        console.log("queryYuE");
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", URL + '/queryUserBalances.action');
            var test1 = res1.text();
            var pattern = /[1234567890\.]*元/g;
            //Alert.alert("",(test1.match(pattern))[0]);
            return (test1.match(pattern))[0].replace('元', '');
        }else{
            var json = await fetch('https://nmdim.leanapp.cn/ykt/queryYuE?cookie='+YktService.cookie, {method: 'GET'});
            var res=await json.json();
            return res.data;
        }
    }

    //查询银行卡余额
    async queryYuE2(){
        console.log("queryYuE2");
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", URL + '/queryBankCardBalance.action');
            var test1 = res1.text();
            var pattern = />([1234567890\.]+)</g;
            //Alert.alert("",(test1.match(pattern))[1]);
            var pattern2 = />([1234567890\.&nbsp;]+元)</g;
            //Alert.alert("",(test1.match(pattern2))[1]);

            return {
                kh: (test1.match(pattern))[1].replace('>', '').replace('<', ''),
                xyk: (test1.match(pattern2))[1].replace('>', '').replace('<', '').replace('&nbsp;元', ''),
                yhk: (test1.match(pattern2))[0].replace('>', '').replace('<', '').replace('&nbsp;元', '')
            }
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/queryYuE2?cookie='+YktService.cookie, {method: 'GET'});
            var res=await json.json();
            return res.data;
        }
    }

    //转账圈存
    async bankTransferAmount(num){
        if(Platform.OS=='android') {
            var res = await RNFetchBlob.fetch("POST", URL + '/bankTransferAmount.action', {}, [{
                name: "amount",
                data: "" + num
            }]);
            var test1 = res.text();
            var bool = test1.indexOf("转账成功");
            if (bool > 0) {
                return true;
            }
            return false;
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/bankTransferAmount?cookie='+YktService.cookie+"&num="+num, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return true;
            }
            return false;
        }
    }

    async utilitBindXiaoQuData(dormId="",dormName="",building="",floorId=""){
        if(Platform.OS=='android') {
            var res = await RNFetchBlob.fetch("POST", URL + '/utilitBindXiaoQuData.action', {}, [{
                name: "dormId",
                data: "" + dormId
            }, {name: "dormName", data: "" + dormName}, {name: "buildingId", data: "" + building}, {
                name: "floorId",
                data: "" + floorId
            }]);
            var text = res.text();
            var arr = text.split('|');
            var data = [];
            if (dormName == "") {
                for (var ii = 0; ii < arr.length; ii++) {
                    data[ii] = {
                        name: arr[ii].split(',')[1],
                        value: arr[ii].split(',')[1],
                        value2: arr[ii].split(',')[0]
                    };
                }
            } else {
                for (var i = 0; i < arr.length; i++) {
                    data[i] = {name: arr[i].split(',')[1], value: arr[i].split(',')[0]};
                }
            }

            return data;
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/utilitBindXiaoQuData?cookie='+YktService.cookie+"&dormId="+dormId+"&dormName="+dormName+"&buildingId="+building+"&floorId="+floorId, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return res.data;
            }
            return false;
        }
    }

    //交电费
    async utilityUnBindUserPowerPay(roomId,dormId,choosePayType,money,dormName="",buildName="",floorName="",roomName=""){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", URL + '/utilityUnBindUserPowerPayInit.action');
            var text1 = res1.text();
            var pattern = /\"accId\"\svalue\s=\"(.*)\"\s\/>/g;
            var accId = (text1.match(pattern)[0]).replace('"accId" value ="', '').replace('" />', '');

            var pattern2 = /\"payType\"\svalue\s=\"(.*)\"\s\/>/g;
            var payType = (text1.match(pattern2)[0]).replace('"payType" value ="', '').replace('" />', '');


            //Alert.alert("",""+roomId+","+dormId+","+choosePayType+","+money+",acc"+accId+","+payType);
            var res = await RNFetchBlob.fetch("POST", URL + '/utilityUnBindUserPowerPay.action', {}, [{
                name: "roomId",
                data: "" + roomId
            }, {name: "dormId", data: "" + dormId}, {name: "choosePayType", data: "" + choosePayType}, {
                name: "money",
                data: "" + money
            }, {name: "accId", data: "" + accId}, {name: "payType", data: "" + payType}, {
                name: "dormName",
                data: "" + dormName
            }, {name: "buildName", data: "" + buildName}, {name: "floorName", data: "" + floorName}, {
                name: "roomName",
                data: "" + roomName
            }]);
            var text = res.text();
            var bool = text.indexOf("缴费成功");
            if (bool > 0) {
                return true;
            }
            return false;
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/utilityUnBindUserPowerPayInit?cookie='+YktService.cookie+"&dormId="+dormId+"&choosePayType="+choosePayType+"&money="+money+"&dormName="+dormName+"&buildName="+buildName+"&floorName="+floorName+"&roomName="+roomName+"&roomId="+roomId, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return true;
            }
            return false;
        }
    }

    //网络缴费
    async payDrcomFee(choosePayType,money){
        if(Platform.OS=='android') {
            var res = await RNFetchBlob.fetch("POST", URL + '/payDrcomFee.action', {}, [{
                name: "choosePayType",
                data: "" + choosePayType
            }, {name: "money", data: "" + money}]);
            var text = res.text();
            var bool = text.indexOf("操作成功");
            if (bool > 0) {
                return true;
            }
            return false;
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/payDrcomFee?cookie='+YktService.cookie+"&choosePayType="+choosePayType+"&money="+money, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return true;
            }
            return false;
        }
    }

    //查询网费
    async queryDrcomBal(){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", URL + '/queryDrcomBal.action');
            var test1 = res1.text();
            var pattern = /[1234567890\.]*元/g;
            //Alert.alert("",(test1.match(pattern))[0]);
            return (test1.match(pattern))[0].replace('元', '');
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/queryDrcomBal?cookie='+YktService.cookie, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return res.data;
            }
            return false;
        }
    }

    async queryUserInfo(){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", URL + '/queryUserInfo.action');
            var test1 = res1.text();
            var pattern = /\<label\>\s\s\s\s\s(.+)/g;
            //Alert.alert("",(test1.match(pattern))[0]);
            return {
                yue: (test1.match(pattern))[7].replace(/\<label\>\s\s\s\s\s/g, ''),
                xm: (test1.match(pattern))[1].replace(/\<label\>\s\s\s\s\s/g, '')
            };
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/queryUserInfo?cookie='+YktService.cookie, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return res.data;
            }
            return false;
        }
    }

    //挂失
    async cardLose(){
        if(Platform.OS=='android') {
            var res = await RNFetchBlob.fetch("GET", URL + '/cardLoseInit.action');
            var pattern = /\<td\>\s\s\s\s\s\s\s[1234567890]*/g;
            var cardNo = (res.text().match(pattern))[0].replace(/\<td\>\s\s\s\s\s\s\s/g, '');

            var res1 = await RNFetchBlob.fetch("GET", URL + '/cardLose.action?cardId=' + cardNo);
            var test1 = res1.text();

            //Alert.alert("",(test1.match(pattern))[0]);
            return true;
        }else {
            var json = await fetch('https://nmdim.leanapp.cn/ykt/cardLose?cookie='+YktService.cookie, {method: 'GET'});
            var res=await json.json();
            if (res.status == 0) {
                return true;
            }
            return false;
        }
    }

}