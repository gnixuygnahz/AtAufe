/**
 * Created by anytime on 16/11/14.
 */

import {
    Alert,NativeModules,Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
const RNFetchBlob2 = NativeModules.RNFetchBlob;
const URL=[
    '211.86.241.170',
    '211.86.241.171',
    '211.86.241.173',
    '211.86.241.175',
    '211.86.241.177',
    '211.86.241.180',
    '211.86.241.181',
    '211.86.241.184',
    '211.86.241.186',
];



export default class JwUrpService {

    constructor(){
        this.id=0;
    }

    async getHost(){
        var res=await RNFetchBlob.fetch('GET','https://nmdim.leanapp.cn/urp/getcookie');
        this.cookie=res.json().data.cookie;
        return res.json().data.hostId;
    }

    async getYZM(){
        if(Platform.OS=='android') {
            this.id = await this.getHost();
            var res = await RNFetchBlob.fetch('GET', "http://" + URL[this.id] + '/validateCodeAction.do?random=' + Math.random());
            return "data:image/jpg;base64," + res.base64();
        }else {
            return "https://nmdim.leanapp.cn/urp/getyzm?hostId=" + this.id+"&cookie="+this.cookie;
        }
    }

    async login(zh,mm,yzm){
        if(Platform.OS=='android') {
            var cookie = await RNFetchBlob2.getCookies("http://" + URL[this.id]);
            var test = await NativeModules.AtAufe.curl("http://" + URL[this.id] + '/loginAction.do', 'zjh=' + zh + '&mm=' + mm + '&v_yzm=' + yzm + "&zjh1&evalue&tips&lx&eflag&fs&dzslh", cookie[0].replace('; path=/', ''));
            var bool = test.response.indexOf("mainFrame.jsp");
            if (bool > 0) {
                return true;
            }
            return false;
        }else {
            var json=await fetch('https://nmdim.leanapp.cn/urp/login?zh='+zh+'&pwd='+mm+'&yzm='+yzm+'&hostId='+this.id+'&cookie='+this.cookie, {method: 'GET'});
            var res=await json.json();
            if(res.status==0){
                return true;
            }else {
                return false;
            }
        }
    }

    //查询成绩
    async queryChengJi(){
        if(Platform.OS=='android') {
            var res1 = await RNFetchBlob.fetch("GET", "http://" + URL[this.id] + '/bxqcjcxAction.do');
            var test1 = res1.text();

            var data = {arr: []};
            var pattern = /<tr\sclass=\"odd\"\sonMouseOut/g;
            var courNum = test1.match(pattern).length;

            var result = encodeURIComponentNew(test1);

            pattern = /<td\salign=\"center\">\s\s\s\s\s\s\s\s(.*)/g;
            var cour = test1.match(pattern);


            for (var i = 0; i < courNum; i++) {
                data.arr[i] = {
                    kch: decodeURIComponent(encodeURIComponentNew(cour[i * 13].replace(/<td\salign=\"center\">\s\s\s\s\s\s\s\s/g, ''))).trim(),
                    kcm: decodeURIComponent(encodeURIComponentNew(cour[2 + i * 13].replace(/<td\salign=\"center\">\s\s\s\s\s\s\s\s/g, ''))).trim(),
                    xf: decodeURIComponent(encodeURIComponentNew(cour[4 + i * 13].replace(/<td\salign=\"center\">\s\s\s\s\s\s\s\s/g, ''))).trim(),
                    sx: decodeURIComponent(encodeURIComponentNew(cour[5 + i * 13].replace(/<td\salign=\"center\">\s\s\s\s\s\s\s\s/g, ''))).trim(),
                    cj: decodeURIComponent(encodeURIComponentNew(cour[9 + i * 13].replace(/<td\salign=\"center\">\s\s\s\s\s\s\s\s/g, ''))).trim(),
                    mc: decodeURIComponent(encodeURIComponentNew(cour[10 + i * 13].replace(/<td\salign=\"center\">\s\s\s\s\s\s\s\s/g, ''))).trim()
                };
            }


            return data;
        }else {
            var json=await fetch('https://nmdim.leanapp.cn/urp/getchengji?hostId='+this.id+'&cookie='+this.cookie, {method: 'GET'});
            var res=await json.json();
            console.log(res);
            if(res.status==0){
                return res.data;
            }else {
                return [];
            }
        }
    }

    encodeData(data){
        return JSON.stringify(data);
    }

    decodeData(str){
        return  JSON.parse(str);
    }

}


function utf8(wide) {
    var c, s;
    var enc = "";
    var i = 0;
    while(i<wide.length) {
        c= wide.charCodeAt(i++);
        // handle UTF-16 surrogates
        if (c>=0xDC00 && c<0xE000) continue;
        if (c>=0xD800 && c<0xDC00) {
            if (i>=wide.length) continue;
            s= wide.charCodeAt(i++);
            if (s<0xDC00 || c>=0xDE00) continue;
            c= ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
        }
        // output value
        if (c<0x80) enc += String.fromCharCode(c);
        else if (c<0x800) enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F));
        else if (c<0x10000) enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F));
        else enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+(c&0x3F));
    }
    return enc;
}

var hexchars = "0123456789ABCDEF";

function toHex(n) {
    return hexchars.charAt(n>>4)+hexchars.charAt(n & 0xF);
}
var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";


function encodeURIComponentNew(s) {
    var s = utf8(s);
    var c;
    var enc = "";
    for (var i= 0; i<s.length; i++) {
        if (okURIchars.indexOf(s.charAt(i))==-1)
            enc += "%"+toHex(s.charCodeAt(i));
        else
            enc += s.charAt(i);
    }
    return enc;
}
