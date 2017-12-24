/**
 * Created by anytime on 16/11/13.
 */
import {
    Alert,Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
const URL="http://211.86.241.245";
export default class SjfcxService {
    async login(zh,mm){
        if(Platform.OS=='android') {
            let res1 = await RNFetchBlob.fetch("GET", URL + '/Default.aspx');
            let test1 = res1.text();
            let pattern = /id=\"__VIEWSTATE\"\svalue=\"(.*)\"/g;
            let __VIEWSTATE = (test1.match(pattern))[0].replace(/id=\"__VIEWSTATE\"\svalue=\"/g, '').replace(/\"/g, '');
            pattern = /id=\"__EVENTVALIDATION\"\svalue=\"(.*)\"/g;
            let __EVENTVALIDATION = (test1.match(pattern))[0].replace(/id=\"__EVENTVALIDATION\"\svalue=\"/g, '').replace(/\"/g, '');
            var res = await RNFetchBlob.fetch("POST", URL + '/Default.aspx', {}, [{
                name: "txtUserName",
                data: "" + zh
            }, {name: "txtPassWord", data: "" + mm}, {
                name: "__VIEWSTATE",
                data: "" + __VIEWSTATE
            }, {name: "__EVENTVALIDATION", data: "" + __EVENTVALIDATION}, {name: "btnLogin", data: ""}]);
            let test = res.text();
            let bool = test.indexOf("当前可操作时间");
            if (bool > 0) {
                return true;
            }
            return false;
        }else {
            var json=await fetch('https://nmdim.leanapp.cn/sjfcx/login?zh='+zh+'&pwd='+mm, {method: 'GET'});
            var res=await json.json();
            if(res.status==0){
                this.cookie=res.data;
                return true;
            }else {
                return false;
            }
        }
    }

    //查询校园卡余额
    async querySjf(){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", URL + '/jssjxfmx.aspx?xh=00000');
            var test1 = res1.text();
            var pattern = /总学分：[1234567890\.]*/g;
            //Alert.alert("",(test1.match(pattern))[0]);
            return (test1.match(pattern))[0].replace('总学分：', '');
        }else {
            var json=await fetch('https://nmdim.leanapp.cn/sjfcx/querySjf?cookie='+this.cookie, {method: 'GET'});
            var res=await json.json();
            console.log(res)
            if(res.status==0){
                return res.data;
            }else {
                return '';
            }
        }
    }
}