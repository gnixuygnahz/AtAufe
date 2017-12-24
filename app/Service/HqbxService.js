/**
 * Created by anytime on 16/11/15.
 */
'use strict';

import {
    Alert,Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

const DomParser = require('react-native-html-parser').DOMParser;



const URL="http://www.ancai.cc";
export default class HqbxService {

    async getYZM(){
        if(Platform.OS=='android'){
            var res=await RNFetchBlob.fetch('GET',URL+'/User/ImageCheck');
            //Alert.alert("",res.headers.get('Set-Cookie'));
            return "data:image/jpg;base64,"+res.base64();
        }else{
            return 'https://nmdim.leanapp.cn/hqbx/getyzm?cookie='+this.cookie;
        }
    }

    async login(zh,mm){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("POST", URL + '/', {}, [{
                name: 'userName',
                data: "" + zh
            }, {name: 'password', data: "" + mm}]);
            var test1 = res1.text();

            var bool = test1.indexOf("注销");
            Alert.alert("", "" + bool);
            if (bool > 0) {
                return true;
            } else {
                return false;
            }
        }else{
            console.log('https://nmdim.leanapp.cn/hqbx/login?zh='+zh+'&pwd='+mm);
            var json=await fetch('https://nmdim.leanapp.cn/hqbx/login?zh='+zh+'&pwd='+mm, {method: 'GET'});
            var res=await json.json();
            console.log(res);
            if(res.status==0){
                this.cookie=res.data;
                return true;
            }else {
                return false;
            }
        }

    }

    async addRepair(){

    }

    async getBuildings(campusID){
        if(Platform.OS=='android') {
            var res = await RNFetchBlob.fetch("POST", URL + '/User1/GetBuildings', {}, [{
                name: "campusID",
                data: "" + campusID
            }]);
            var text = res.text();

            var doc = new DomParser().parseFromString(text, 'text/xml');
            let Buildings = doc.getElementsByTagName('Building');


            let data = [];

            for (let i = 0; i < Buildings.length; i++) {

                data[i] = {
                    id: Buildings.item(i).getElementsByTagName('ID').item(0).textContent,
                    buildingNo: Buildings.item(i).getElementsByTagName('BuildingNo').item(0).textContent,
                    alias: Buildings.item(i).getElementsByTagName('Alias').item(0).textContent,
                }
            }

            return data;
        }else{
            var json=await fetch('https://nmdim.leanapp.cn/hqbx/getBuildings?cookie='+this.cookie+'&campusID='+campusID, {method: 'GET'});
            var res=await json.json();
            return res.data;
        }
    }

   async postRepair(name,campusID,address,buildingID,time,phone,typeID,repairContent,yzm){
       if(Platform.OS=='android') {
           //Alert.alert("",""+name+campusID+address+buildingID+time+phone+typeID+repairContent+yzm);
           var res = await RNFetchBlob.fetch("POST", URL + '/User1/AddRepair_Ajax?r=' + Math.random(), {}, [{
               name: "name",
               data: "" + name
           }, {name: "campusID", data: "" + campusID}, {name: "address", data: "" + address}, {
               name: "buildingID",
               data: "" + buildingID
           }, {name: "time", data: "" + time}, {name: "phone", data: "" + phone}, {
               name: "typeID",
               data: "" + typeID
           }, {name: "repairContent", data: "" + repairContent}, {name: "yzm", data: "" + yzm}]);
           var text = res.text();
           var bool = text.indexOf("success");
           if (bool > 0) {
               return true;
           } else {
               return false;
           }
       }else{
           var json=await fetch('https://nmdim.leanapp.cn/hqbx/postRepair?cookie='+this.cookie+'&campusID='+campusID, {method: 'GET'});
           var res=await json.json();
       }
   }

}