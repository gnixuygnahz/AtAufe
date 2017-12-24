/**
 * Created by anytime on 16/11/12.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,
    TouchableOpacity,Interactionmanager } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import SjfcxService from './../../../Service/SjfcxService';
import AV from 'leancloud-storage';
import { List, ListItem } from 'react-native-elements'
import Toast from 'react-native-root-toast';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Sjf=new SjfcxService();
export default class YuEPage extends Component {
    constructor(props){
        super(props);
        this.state={
            sjf:"",
        }
    }

    componentDidMount() {
        this._init();
    }

    async _init(){

        this.showLoading();
        var bool=await Sjf.login( AV.User.current().getUsername(), AV.User.current().get("pwd"));
        var sjf = await Sjf.querySjf();
        if(!bool){
            this.showMsg("查询失败");
        }
        this.hideLoading();
        this.setState({sjf:sjf});
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

    render(){
        return (
            <View style={AppStyle.container}>

                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>实践分查询</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>

                    </View>
                </View>

                <List>
                    <ListItem
                        title={"实践总分:  "+this.state.sjf+"分"}
                    />
                </List>
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }

}