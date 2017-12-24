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
import { List, ListItem } from 'react-native-elements'
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;


const Ykt=new YktSerivce();
export default class YuEPage extends Component {
    constructor(props){
        super(props);
        this.state={
            yhk:"",
            xyk:"",
            wf:""
        }
    }

    componentDidMount() {
        this._init();
    }

    async _init(){

        this.showLoading();
        var xyk =await Ykt.queryYuE();
        var info = await Ykt.queryYuE2();
        var wf=await Ykt.queryDrcomBal();
        this.hideLoading();
        this.setState({yhk:info.yhk,xyk:xyk,wf:wf});
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
                        title={"银行卡余额:  "+this.state.yhk+"元"}
                    />
                    <ListItem
                        title={"校园卡余额:  "+this.state.xyk+"元"}
                    />
                    <ListItem
                        title={"网费余额:   "+this.state.wf+"元"}
                        subtitle="每月(一次性)扣费"
                    />
                </List>
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }

}