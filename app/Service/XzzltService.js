/**
 * Created by anytime on 16/11/16.
 */
'use strict';

import {
    Alert
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

const URL="http://zlt.aufe.edu.cn";
export default class YktService {

    async getYZM(){
        var res=await RNFetchBlob.fetch('GET',URL+'/checkCode.action?t='+Math.random());
        //Alert.alert("",res.headers.get('Set-Cookie'));
        return "data:image/jpg;base64,"+res.base64();
    }

    async query(page){
        var res1=await RNFetchBlob.fetch("GET",URL+'/message/messageappear/messageAppearMain.faces',{},[{name:"dormName",data:""+dormName}]);
        var test1=res1.text();
        var pattern = /[1234567890\.]*元/g;
        //Alert.alert("",(test1.match(pattern))[0]);
        return (test1.match(pattern))[0].replace('元','');
    }

    async queryYuE2(page){
        var res1=await RNFetchBlob.fetch("GET",URL+'/queryBankCardBalance.action');
        var test1=res1.text();
        var pattern = />([1234567890\.]+)</g;
        //Alert.alert("",(test1.match(pattern))[1]);
        var pattern2 = />([1234567890\.&nbsp;]+元)</g;
        //Alert.alert("",(test1.match(pattern2))[1]);

        return {kh:(test1.match(pattern))[1].replace('>','').replace('<',''),xyk:(test1.match(pattern2))[1].replace('>','').replace('<','').replace('&nbsp;元',''),yhk:(test1.match(pattern2))[0].replace('>','').replace('<','').replace('&nbsp;元','')}
    }

    async bankTransferAmount(num){
        var res=await RNFetchBlob.fetch("POST",URL+'/bankTransferAmount.action',{},[{name:"amount",data:""+num}]);
        var test1=res.text();
        var bool = test1.indexOf("转账成功");
        if(bool>0){
            return true;
        }
        return false;
    }

    async utilitBindXiaoQuData(dormId="",dormName="",building="",floorId=""){
        var res=await RNFetchBlob.fetch("POST",URL+'/utilitBindXiaoQuData.action',{},[{name:"dormId",data:""+dormId},{name:"dormName",data:""+dormName},{name:"buildingId",data:""+building},{name:"floorId",data:""+floorId}]);
        var text=res.text();
        var arr=text.split('|');
        var data=[];
        if(dormName==""){
            for(var ii=0;ii<arr.length;ii++){
                data[ii]={name:arr[ii].split(',')[1],value:arr[ii].split(',')[1],value2:arr[ii].split(',')[0]};
            }
        }else{
            for(var i=0;i<arr.length;i++){
                data[i]={name:arr[i].split(',')[1],value:arr[i].split(',')[0]};
            }
        }

        return data;
    }

    async utilityUnBindUserPowerPay(roomId,dormId,choosePayType,money,dormName="",buildName="",floorName="",roomName=""){

        var res1=await RNFetchBlob.fetch("GET",URL+'/utilityUnBindUserPowerPayInit.action');
        var text1=res1.text();
        var pattern = /\"accId\"\svalue\s=\"(.*)\"\s\/>/g;
        var accId=(text1.match(pattern)[0]).replace('"accId" value ="','').replace('" />','');

        var pattern2 = /\"payType\"\svalue\s=\"(.*)\"\s\/>/g;
        var payType = (text1.match(pattern2)[0]).replace('"payType" value ="','').replace('" />','');


        //Alert.alert("",""+roomId+","+dormId+","+choosePayType+","+money+",acc"+accId+","+payType);
        var res=await RNFetchBlob.fetch("POST",URL+'/utilityUnBindUserPowerPay.action',{},[{name:"roomId",data:""+roomId},{name:"dormId",data:""+dormId},{name:"choosePayType",data:""+choosePayType},{name:"money",data:""+money},{name:"accId",data:""+accId},{name:"payType",data:""+payType},{name:"dormName",data:""+dormName},{name:"buildName",data:""+buildName},{name:"floorName",data:""+floorName},{name:"roomName",data:""+roomName}]);
        var text=res.text();
        var bool = text.indexOf("缴费成功");
        if(bool>0){
            return true;
        }
        return false;
    }

    //网络缴费
    async payDrcomFee(choosePayType,money){

        var res=await RNFetchBlob.fetch("POST",URL+'/payDrcomFee.action',{},[{name:"choosePayType",data:""+choosePayType},{name:"money",data:""+money}]);
        var text=res.text();
        var bool = text.indexOf("操作成功");
        if(bool>0){
            return true;
        }
        return false;
    }

    //查询网费
    async queryDrcomBal(){
        var res1=await RNFetchBlob.fetch("GET",URL+'/queryDrcomBal.action');
        var test1=res1.text();
        var pattern = /[1234567890\.]*元/g;
        //Alert.alert("",(test1.match(pattern))[0]);
        return (test1.match(pattern))[0].replace('元','');
    }

    async queryUserInfo(){
        var res1=await RNFetchBlob.fetch("GET",URL+'/queryUserInfo.action');
        var test1=res1.text();
        var pattern = /\<label\>\s\s\s\s\s(.+)/g;
        //Alert.alert("",(test1.match(pattern))[0]);
        return {yue:(test1.match(pattern))[7].replace(/\<label\>\s\s\s\s\s/g,''),xm:(test1.match(pattern))[1].replace(/\<label\>\s\s\s\s\s/g,'')};
    }

    //挂失
    async cardLose(){
        var res=await RNFetchBlob.fetch("GET",URL+'/cardLoseInit.action');
        var pattern = /\<td\>\s\s\s\s\s\s\s[1234567890]*/g;
        var cardNo=(res.text().match(pattern))[0].replace(/\<td\>\s\s\s\s\s\s\s/g,'');

        var res1=await RNFetchBlob.fetch("GET",URL+'/cardLose.action?cardId='+cardNo);
        var test1=res1.text();

        //Alert.alert("",(test1.match(pattern))[0]);
        return true;
    }

}