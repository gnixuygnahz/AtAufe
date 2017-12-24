/**
 * Created by anytime on 16/11/14.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,InteractionManager,
    TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import JwUrpService from './../../../Service/JwUrpService';
import AV from 'leancloud-storage';
import { List, ListItem } from 'react-native-elements'
import Toast from 'react-native-root-toast';
import AppInitService from './../../../Service/AppInitService';
import QueryPage from './QueryPage';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Jw=new JwUrpService();
export default class CjcxPage extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{arr:[]},
        }
    }

    componentDidMount() {
        this._init();
    }

    _init(){
        const { navigator } = this.props;
        const page = this;

        InteractionManager.runAfterInteractions(() => {
            let realm= AppInitService.getRealm();
            let ChengJi=realm.objects('AppStorage').filtered('name = "ChengJi"');
            if(ChengJi==null||ChengJi.length==0){
                navigator.push({
                    name: 'QueryPage',
                    component: QueryPage,
                    params:{
                        page:page
                    }
                });
            }else{
                page.setChengJi();
            }
        });
    }

    setChengJi(){
        let realm= AppInitService.getRealm();
        let ChengJi=realm.objects('AppStorage').filtered('name = "ChengJi"')[0];
        console.log(Jw.decodeData(ChengJi.string));
        this.setState({
            data: Jw.decodeData(ChengJi.string)
        });
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

    _renderItem(data,i){
        console.log(data);
        return (
            <View key={data.kch} style={{flexDirection:"row",backgroundColor:"#FFFFFF",height:50, alignItems: 'center' ,borderBottomWidth: 0.5,borderColor: '#E3E7F1'}}>
                <View style={{flexDirection:"column",backgroundColor:"#FFFFFF",height:45, justifyContent: 'center' ,flex:1}}>
                <Text style={{marginLeft:15,marginRight:15,fontSize:16}}>{data.kcm.trim()}</Text>
                    <Text style={{marginLeft:15,fontSize:12}}>学分:{data.xf.trim()}  属性:{data.sx.trim()}</Text>
                </View>
                <Text style={{width:60}}>{data.cj.trim()==""?"":data.cj.trim()+"分"}</Text>
            </View>
        );
    }

    render(){
        const { navigator } = this.props;
        return (
            <View style={AppStyle.container}>

                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>成绩查询</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            navigator.push({
                                name: 'QueryPage',
                                component: QueryPage,
                                params:{
                                    page:this
                                }
                            });
                        }}>
                            <Text style={AppStyle.toolbarTitle}>更新</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection:"column",marginTop:15,backgroundColor:"#FFFFFF"}}>

                    {this.state.data.arr&&this.state.data.arr.map((item,i)=>{return this._renderItem(item,i)})}
                </View>
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }

}