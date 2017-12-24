/**
 * Created by anytime on 16/11/11.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,Alert,
    TouchableOpacity,Interactionmanager } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import YktSerivce from './../../../Service/YktService';
import { List, ListItem } from 'react-native-elements';
import Toast from 'react-native-root-toast';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Ykt=new YktSerivce();
export default class GuaShiPage extends Component {
    constructor(props){
        super(props);
        this.state={
            je:"",
        }
    }



    async chongzhi(){
        let page = this;
        Alert.alert('注意', '为了您的校园卡帐户资金安全，卡片丢失后，请您尽快挂失，并到校园卡管理中心补卡,是否挂失?', [
            {text: '挂失', onPress: ()=>{
                page.showLoading();
                Ykt.cardLose().then(function (bool) {
                    page.hideLoading();
                    if(bool){
                        page.showMsg("挂失成功");
                        page.pressBack();
                    }else{
                        page.showMsg("挂失失败");
                    }
                });

            }
            },
            {text: '取消',onPress:()=>{}},
        ]);

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


                <Button
                    small={true}
                    buttonStyle={{marginTop:15,height:35}}
                    color="white"
                    backgroundColor="#D2101E"
                    borderRadius={4}
                    fontSize={20}
                    title="挂失"
                    onPress={this.chongzhi.bind(this)}
                />
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }

}