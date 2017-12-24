import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity,TextInput,StyleSheet,PixelRatio,Image,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import CourseService from './../../Service/CourseService';
import AV from 'leancloud-storage';
import AppInitService from './../../Service/AppInitService';
import UrpService from './../../Service/UrpService';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class UpdatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yzm: '',
            img: 'a',
        };
        this.config={};
    }

    componentDidMount(){
        let login=this;

        UrpService.getYZM().then(function (url,config) {
            login.config=config;
            login.setYZM(url);
        }).catch((error2) => {
            login.showMsg(error2.message);
        });

        // const {navigator} = this.props;
        // if (Platform.OS === 'android') {
        //     BackAndroid.addEventListener('hardwareBackPress', function () {
        //
        //         if (navigator) {
        //             navigator.pop();
        //         }
        //         return true;
        //     });
        // }
    }

    setYZM(yzm) {
        this.setState({ img: yzm });
    }

    showMsg(msg){

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

    showLoading(){
        loaderHandler.showLoader("Loading");
    }

    hideLoading(){
        loaderHandler.hideLoader();
    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    pressFinish(){

        let page=this;
        page.showLoading();
        UrpService.updateUserInfo(AV.User.current().getObjectId(),AV.User.current().get('skey'),page.state.yzm,page.config)
            .then((responseJson) => {
                if(responseJson.status==0){
                    CourseService.getNetCourse().then(function(courses) {
                        // 成功
                        let realm = AppInitService.getRealm();
                        let ret = realm.objects('Course');
                        realm.write(() => {
                            realm.delete(ret);
                        });
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
                                    peiYangFangAn:  courses[ii].get('peiYangFangAn')});
                        }
                        });
                        AV.User.current().fetch().then(function () {
                            page.pressBack();
                        });
                    }, function(error) {
                        // 失败
                        page.showMsg(error);
                        page.hideLoading();
                    });

                }else{
                    page.showMsg(responseJson.errMsg);
                    UrpService.getYZM().then(function (url,config) {
                        page.config=config;
                        page.setYZM(url);
                        page.hideLoading();
                    }).catch((error2) => {
                        page.showMsg(error2.message);
                        page.hideLoading();
                    });
                }
            })
            .catch((error) => {
                page.showMsg(error.message);
                page.hideLoading();
            });
    }

    render() {
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>更新数据</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressFinish.bind(this)}><Text style={AppStyle.toolbarTitle}>完成</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,marginTop:15}}>



                    <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",height:40, alignItems: 'center'}}>
                        <Text style={{marginLeft:15,marginRight:15}}>验证码</Text>
                        <TextInput
                            style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                            underlineColorAndroid="transparent"
                            placeholder="请输入验证码"
                            value={this.state.yzm} onChangeText={(text) => { this.setState({ yzm: text }); }}
                        />
                        <Image  style={{height:30,width:70}} source={{uri:this.state.img}} />
                    </View>

            </View>
                <BusyIndicator style={{zIndex:999}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    input: {
        height: PixelRatio.getPixelSizeForLayoutSize(18),
        flex: 1,
    },
});

