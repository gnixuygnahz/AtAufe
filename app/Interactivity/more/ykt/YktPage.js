/**
 * Created by anytime on 16/11/10.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,
    TouchableOpacity,Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import YktSerivce from './../../../Service/YktService';
import MenuPage from './MenuPage';
import AppInitService from './../../../Service/AppInitService';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Ykt=new YktSerivce();
export default class YktPage extends Component {
    constructor(props){
        super(props);
        this.state={
            checked:false,
            yzmimg:"a",
            zh:"",
            mm:"",
            yzm:""
        }
    }

    componentDidMount() {

        let realm = AppInitService.getRealm();

        if(realm.objects('AppStorage').filtered('name = "Yktpwd"')==null||realm.objects('AppStorage').filtered('name = "Yktpwd"').length==0){

        }else {
            this.setState({zh:realm.objects('AppStorage').filtered('name = "Yktpwd"')[0].string.split(';')[0],mm:realm.objects('AppStorage').filtered('name = "Yktpwd"')[0].string.split(';')[1],checked:true});
        }

        this._init();
    }

    async _init(){
        var img = await Ykt.getYZM();
        this.setState({yzmimg:img});
    }

    async _login(){
        const { navigator } = this.props;
        this.showLoading();
        var bool=await Ykt.login(this.state.zh,this.state.mm,this.state.yzm);
        this.hideLoading();
        if(bool){

            if(this.state.checked){
                let realm = AppInitService.getRealm();
                realm.write(() => {
                    realm.create('AppStorage', {
                        name: "Yktpwd",
                        string:this.state.zh+";"+this.state.mm,
                    });
                });
            }

            navigator.push({
                name: 'MenuPage',
                component: MenuPage,
            });
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

                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>校园一卡通</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>

                    </View>
                </View>

                <View style={{flexDirection:"column",marginTop:15,backgroundColor:"#FFFFFF"}}>
                    <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",height:40, alignItems: 'center' ,borderBottomWidth: 0.5,borderColor: '#E3E7F1'}}>
                        <Text style={{marginLeft:15,marginRight:15}}>账号</Text>
                        <TextInput
                            style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                            underlineColorAndroid="transparent"
                            placeholder="请输入您的一卡通账号"
                            value={this.state.zh} onChangeText={(text) => { this.setState({ zh: text }); }}
                        />
                    </View>
                    <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",height:40, alignItems: 'center',borderBottomWidth: 0.5,borderColor: '#E3E7F1'}}>
                        <Text style={{marginLeft:15,marginRight:15}}>密码</Text>
                        <TextInput
                            style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            placeholder="请输入您的一卡通密码"
                            value={this.state.mm} onChangeText={(text) => { this.setState({ mm: text }); }}
                        />
                    </View>
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

                <CheckBox
                    title='记住账号'
                    checked={this.state.checked}
                    checkedColor="#2196F3"
                    containerStyle={{backgroundColor:"#EBEBF1",paddingBottom:0,marginBottom:0}}
                    onPress={()=>{this.setState({checked:!this.state.checked})}}
                />

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
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }

}