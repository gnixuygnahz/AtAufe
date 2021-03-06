/**
 * Created by anytime on 16/11/11.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,
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
export default class ZiZhuPage extends Component {
    constructor(props){
        super(props);
        this.state={
            je:"",
        }
    }



    async chongzhi(){
        this.showLoading();
        var bool = await Ykt.bankTransferAmount(this.state.je);
        this.hideLoading();
        if(bool){
            this.props.page._init();
            this.showMsg("充值成功");
            this.pressBack();
        }else{
            this.showMsg("充值失败");
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

                <View style={{flexDirection:"column",marginTop:15,backgroundColor:"#FFFFFF"}}>
                    <View style={{flexDirection:"row",backgroundColor:"#FFFFFF",height:40, alignItems: 'center' ,borderBottomWidth: 0.5,borderColor: '#E3E7F1'}}>
                        <Text style={{marginLeft:15,marginRight:15}}>充值金额</Text>
                        <TextInput
                            style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                            underlineColorAndroid="transparent"
                            placeholder="请输入您的充值金额"
                            keyboardType="numeric"
                            value={this.state.je} onChangeText={(text) => { this.setState({ je: text }); }}
                        />
                    </View>
                </View>

                <Button
                    small={true}
                    buttonStyle={{marginTop:15,height:35}}
                    color="white"
                    backgroundColor="#2196F3"
                    borderRadius={4}
                    fontSize={20}
                    title="充值"
                    onPress={this.chongzhi.bind(this)}
                />
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }

}