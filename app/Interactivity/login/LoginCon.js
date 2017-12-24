import AV from 'leancloud-storage';
import CourseService from './../../Service/CourseService';
import AppInitService from './../../Service/AppInitService';
import UrpService from './../../Service/UrpService';
import { Alert
} from 'react-native';
export default class LoginCon {
    constructor(page) {
        this.page = page;
        this.config={};
    }

    login(zh, pwd, yzm) {
        let login =this;
        this.page.showLoading();
        if (yzm === '') {
            AV.User.logIn(zh, pwd).then(function (loginedUser) { // 尝试登陆
                CourseService.getNetCourse().then(function(courses) {
                    // 成功

                    let realm = AppInitService.getRealm();
                        realm.write(() => {
                            for (let ii=0;ii<courses.length;ii++){
                            realm.create('Course', {
                                objectId:  courses[ii].getObjectId(),
                                keChengHao:  courses[ii].get('keChengHao'),
                                xueFen:  courses[ii].get('xueFen'),
                                jiaoShi:   courses[ii].get('jiaoShi'),
                                xiaoQu:  courses[ii].get('xiaoQu'),
                                teacher:  courses[ii].get('teacher'),
                                xingQi:  courses[ii].get('xingQi'),
                                jieCi:  courses[ii].get('jieCi'),
                                jiaoXueLou:  courses[ii].get('jiaoXueLou'),
                                kaoShiLeiXing:  courses[ii].get('kaoShiLeiXing'),
                                jieShu:  courses[ii].get('jieShu'),
                                zhouCi:  courses[ii].get('zhouCi'),
                                xuanKeZhuangTai:  courses[ii].get('xuanKeZhuangTai'),
                                xiuDuFangShi:  courses[ii].get('xiuDuFangShi'),
                                keChengShuXing:  courses[ii].get('keChengShuXing'),
                                keXuHao:  courses[ii].get('keXuHao'),
                                keChengMing: courses[ii].get('keChengMing'),
                                peiYangFangAn:  courses[ii].get('peiYangFangAn')
                            }
                                );
                        }
                        });

                    login.page.jumpToMain();
                }, function(error) {
                    // 失败
                    login.page.showMsg(error);
                    login.page.hideLoading();
                });
            }, function (error) { // 登陆失败
                switch (error.code) {
                    case 210: // 用户名和密码不匹配
                        login.page.showMsg('用户名和密码不匹配');
                        login.page.hideLoading();
                        login.page.hideYZM();
                        break;
                    case 211: //找不到用户

                        UrpService.getYZM().then(function (url,config) {
                            login.config=config;
                            login.page.setYZM(url);
                            login.page.showYZM();
                            login.page.hideLoading();
                        }).catch(function (err) {
                            login.page.showMsg(err.errMsg);
                            login.page.hideLoading();
                        });
                        break;
                    default:

                }
            });
        } else { // 带验证码登陆
            AV.User.logIn(zh, pwd).then(function (loginedUser) { // 先尝试登陆


                CourseService.getNetCourse().then(function(courses) {
                    // 成功

                    let realm = AppInitService.getRealm();
                    realm.write(() => {
                        for (let ii=0;ii<courses.length;ii++){
                            realm.create('Course', {
                                objectId:  courses[ii].getObjectId(),
                                keChengHao:  courses[ii].get('keChengHao'),
                                xueFen:  courses[ii].get('xueFen'),
                                jiaoShi:   courses[ii].get('jiaoShi'),
                                xiaoQu:  courses[ii].get('xiaoQu'),
                                teacher:  courses[ii].get('teacher'),
                                xingQi:  courses[ii].get('xingQi'),
                                jieCi:  courses[ii].get('jieCi'),
                                jiaoXueLou:  courses[ii].get('jiaoXueLou'),
                                kaoShiLeiXing:  courses[ii].get('kaoShiLeiXing'),
                                jieShu:  courses[ii].get('jieShu'),
                                zhouCi:  courses[ii].get('zhouCi'),
                                xuanKeZhuangTai:  courses[ii].get('xuanKeZhuangTai'),
                                xiuDuFangShi:  courses[ii].get('xiuDuFangShi'),
                                keChengShuXing:  courses[ii].get('keChengShuXing'),
                                keXuHao:  courses[ii].get('keXuHao'),
                                keChengMing: courses[ii].get('keChengMing'),
                                peiYangFangAn:  courses[ii].get('peiYangFangAn')
                            });
                        }
                    });

                    login.page.jumpToMain();
                }, function(error) {
                    // 失败
                    login.page.showMsg(error);
                    login.page.hideLoading();
                });

            }, function (error) { // 此处注册逻辑

                Alert.alert("注册");
                UrpService.register(zh,pwd,yzm,login.config).then(function () {
                    AV.User.logIn(zh, pwd).then(function () {
                        CourseService.getNetCourse().then(function(courses) {
                            // 成功
                            let realm = AppInitService.getRealm();
                            realm.write(() => {
                                for (let ii=0;ii<courses.length;ii++){
                                    realm.create('Course', {
                                        objectId:  courses[ii].getObjectId(),
                                        keChengHao:  courses[ii].get('keChengHao'),
                                        xueFen:  courses[ii].get('xueFen'),
                                        jiaoShi:   courses[ii].get('jiaoShi'),
                                        xiaoQu:  courses[ii].get('xiaoQu'),
                                        teacher:  courses[ii].get('teacher'),
                                        xingQi:  courses[ii].get('xingQi'),
                                        jieCi:  courses[ii].get('jieCi'),
                                        jiaoXueLou:  courses[ii].get('jiaoXueLou'),
                                        kaoShiLeiXing:  courses[ii].get('kaoShiLeiXing'),
                                        jieShu:  courses[ii].get('jieShu'),
                                        zhouCi:  courses[ii].get('zhouCi'),
                                        xuanKeZhuangTai:  courses[ii].get('xuanKeZhuangTai'),
                                        xiuDuFangShi:  courses[ii].get('xiuDuFangShi'),
                                        keChengShuXing:  courses[ii].get('keChengShuXing'),
                                        keXuHao:  courses[ii].get('keXuHao'),
                                        keChengMing: courses[ii].get('keChengMing'),
                                        peiYangFangAn:  courses[ii].get('peiYangFangAn')
                                    });
                                }
                            });

                            login.page.jumpToMain();
                        }, function(error) {
                            // 失败
                            login.page.showMsg(error);
                            login.page.hideLoading();
                        });
                    });
                }).catch(function (err) {
                    login.page.showMsg(err.errMsg);
                    UrpService.getYZM().then(function (url,config) {
                        login.config=config;
                        login.page.setYZM(url);
                        login.page.showYZM();
                        login.page.hideLoading();
                    }).catch(function (err) {
                        login.page.showMsg(err.errMsg);
                        login.page.hideLoading();
                    });
                    login.page.hideLoading();
                });
            });
        }
    }

}
