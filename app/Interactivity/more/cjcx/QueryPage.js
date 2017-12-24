/**
 * Created by anytime on 16/11/14.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,
    TouchableOpacity,Alert } from 'react-native';
import AV from 'leancloud-storage';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import JwUrpService from './../../../Service/JwUrpService';
import Toast from 'react-native-root-toast';
import AppInitService from './../../../Service/AppInitService';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Jw=new JwUrpService();
export default class QueryPage extends Component {
    constructor(props){
        super(props);
        this.state={
            yzmimg:"a",
            yzm:""
        }
    }

    componentDidMount() {
        this._init();
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

    async _init(){
        let img = await Jw.getYZM();
        this.setState({yzmimg:img});
    }

    async _login(){
        const { navigator } = this.props;
        this.showLoading();
        var bool=await Jw.login(AV.User.current().getUsername(),AV.User.current().get("pwd"),this.state.yzm);
        if(bool){
            let realm= AppInitService.getRealm();

            let data=await Jw.queryChengJi();

            realm.write(() => {
                let items=realm.objects('AppStorage').filtered('name = "ChengJi"');
                realm.delete(items);
                console.log("==");
                console.log(data);
                realm.create('AppStorage', {
                    name: "ChengJi",
                    string:Jw.encodeData(data),
                });
            });


            this.props.page.setChengJi();
            this.showMsg("查询成功");
            this.hideLoading();
            if (navigator) {
                navigator.pop();
            }
        }else{
            this.showMsg("查询失败");
        }
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

    render(){
        return (
            <View style={AppStyle.container}>
                <BusyIndicator style={{zIndex:10}} />
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>成绩查询</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>

                    </View>
                </View>

                <View style={{flexDirection:"column",marginTop:15,backgroundColor:"#FFFFFF"}}>
                    <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",height:40, alignItems: 'center'}}>
                        <Text style={{marginLeft:15,marginRight:15}}>验证码</Text>
                        <TextInput
                            style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                            underlineColorAndroid="transparent"
                            placeholder="请输入验证码"
                            value={this.state.yzm} onChangeText={(text) => { this.setState({ yzm: text }); }}
                        />
                        <Image  style={{height:30,width:70}} source={{uri:this.state.yzmimg}} />
                    </View>
                </View>
                <Button
                    small={true}
                    buttonStyle={{marginTop:15,height:35}}
                    color="white"
                    backgroundColor="#2196F3"
                    borderRadius={4}
                    fontSize={20}
                    title="登陆"
                    onPress={this._login.bind(this)}
                />
            </View>
        );
    }

}