/**
 * Created by anytime on 16/11/11.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,
    TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import YktSerivce from './../../../Service/YktService';
import { List, ListItem } from 'react-native-elements'

import YuePage from './YuEPage';
import ZiZhuPage from './ZiZhuPage'
import GouDianPage from './GouDianPage';
import WangLuoPage from './WangLuoPage';
import GuaShiPage from './GuaShiPage';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Ykt=new YktSerivce();
export default class KebiaoPage extends Component {
    constructor(props){
        super(props);
        this.state={
            xm:"",
            ye:0,
        }
    }

    componentDidMount() {
        this._init();
    }

    async _init(){

        var info = await Ykt.queryUserInfo();
        this.setState({xm:info.xm,ye:info.yue});
    }

    async _login(){

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
        const page=this;
        const { navigator } = this.props;
        return (
            <View style={AppStyle.container}>

                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>校园一卡通</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>

                    </View>
                </View>

                <List>
                    <ListItem
                        avatar={require('./aufe.jpg')}
                        title={this.state.xm.trim()}
                        subtitle={"校园卡余额:"+this.state.ye+"元"}
                    />
                </List>

                <List>
                    <ListItem

                        title="余额查询"
                        leftIcon={{name: "credit-card"}}
                        onPress={()=>{
                            navigator.push({
                                name: 'YuePage',
                                component: YuePage,
                            });

                        }}
                    />
                    <ListItem

                        title="自助圈存"
                        leftIcon={{name: "system-update-alt"}}
                        onPress={()=>{
                            navigator.push({
                                name: 'ZiZhuPage',
                                component: ZiZhuPage,
                                params:{
                                    page:page
                                }
                            });
                        }}
                    />
                    <ListItem

                        title="房间购电"
                        leftIcon={{name: "lightbulb-outline"}}
                        onPress={()=>{
                            navigator.push({
                                name: 'GouDianPage',
                                component: GouDianPage,
                                params:{
                                    page:page
                                }
                            });
                        }}
                    />
                    <ListItem
                        title="网络缴费"
                        leftIcon={{name: "laptop-windows"}}
                        onPress={()=>{
                            navigator.push({
                                name: 'WangLuoPage',
                                component: WangLuoPage,
                                params:{
                                    page:page
                                }
                            });
                        }}
                    />
                    <ListItem

                        title="卡片挂失"
                        leftIcon={{name: "warning"}}
                        onPress={()=>{
                            navigator.push({
                                name: 'GuaShiPage',
                                component: GuaShiPage,
                                params:{
                                    page:page
                                }
                            });
                        }}
                    />
                </List>


                <BusyIndicator style={{zIndex:10}} />

            </View>
        );
    }

}