/**
 * Created by anytime on 16/11/11.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,Alert,Platform,
    TouchableOpacity,Interactionmanager,Picker } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import YktSerivce from './../../../Service/YktService';
import { List, ListItem } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import Pickerx from 'react-native-picker';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const Ykt=new YktSerivce();
export default class GouDianPage extends Component {
    constructor(props){
        super(props);
        this.state={
            dormId:"",
            dormName:"",
            dormData:[{name:"",value:1}],
            building:"",
            buildingData:[{name:"",value:1}],
            floorId:"",
            floorIdData:[{name:"",value:1}],
            roomData:[{name:"",value:1}],
            roomId:"",
            choosePayType:"1",
            money:"",
            je:""
        }
        this.renderKey=this.renderKey.bind(this);
        this.renderKey2=this.renderKey2.bind(this);
    }

    componentDidMount() {
        this._init();
    }

    async _init(){

        if (Platform.OS == 'android') {
            let a=await Ykt.utilitBindXiaoQuData();
            this.setState({dormData:a,dormName:a[0].name});
        }else{
            let a=await Ykt.utilitBindXiaoQuData();
            this.setState({dormData:a,dormName:a[0].name});
            let b=await Ykt.utilitBindXiaoQuData(a[0].name,a[0].name);
            this.setState({buildingData: b, building: b[0].value});
            let c=await Ykt.utilitBindXiaoQuData(a[0].name,a[0].name,b[0].value);
            this.setState({floorIdData: c, floorId: c[0].value});
            let d=await Ykt.utilitBindXiaoQuData(a[0].name,a[0].name,b[0].value,c[0].value);
            this.setState({roomData: d, roomId: d[0].value});
        }
    }

    async chongzhi(){
        this.showLoading();
        let dn="";
        let s;
        for(s in this.state.dormData){
            if(this.state.dormData[s].value==this.state.dormName){
                dn=this.state.dormData[s].value2;
            }
        }
        let buildName="";
        for(s in this.state.buildingData){
            if(this.state.buildingData[s].value==this.state.building){
                buildName=this.state.buildingData[s].name;
            }
        }
        let floorName="";
        for(s in this.state.floorIdData){
            if(this.state.floorIdData[s].value==this.state.floorId){
                floorName=this.state.floorIdData[s].name;
            }
        }
        let roomName="";
        for(s in this.state.roomData){
            if(this.state.roomData[s].value==this.state.roomId){
                roomName=this.state.roomData[s].name;
            }
        }
        var bool = await Ykt.utilityUnBindUserPowerPay(this.state.roomId,dn,this.state.choosePayType,this.state.je,this.state.dormName,buildName,floorName,roomName);
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
    

    _renderPickerItem(data,i){
        return (<Picker.Item key={data.name} label={data.name} value={data.value} />);
    }

    renderKey(value,data){

        for(var i=0;i<data.length;i++){
            if(data[i].value==value){

                return data[i].key;
            }
        }
    }

    renderKey2(value,data){
        for(var i=0;i<data.length;i++){
            if(data[i].value==value){
                return data[i].name;
            }
        }
    }

    render() {
        var page = this;
        if (Platform.OS == 'android') {
            return (
                <View style={AppStyle.container}>

                    <View style={AppStyle.toolbar}>
                        <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5}
                                                                    onPress={this.pressBack.bind(this)}><Icon2
                            name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text
                            style={AppStyle.toolbarTitle}>校园一卡通</Text></View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 70, paddingRight: 10}}>

                        </View>
                    </View>

                    <View style={{flexDirection: "column", marginTop: 15, backgroundColor: "#FFFFFF"}}>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.state.dormName}
                                onValueChange={(lang) => {
                                    this.setState({
                                        dormId: lang, dormName: lang, building: "",
                                        buildingData: [],
                                        floorId: "",
                                        floorIdData: [],
                                        roomData: [],
                                        roomId: "",
                                    });
                                    Ykt.utilitBindXiaoQuData(lang, lang).then(function (ret) {
                                        page.setState({buildingData: ret, building: ret[0].value});
                                    }).catch(function () {

                                    });
                                }}
                                mode='dropdown'
                            >
                                {this.state.dormData.map((item, i) => {
                                    return this._renderPickerItem(item, i)
                                })}
                            </Picker>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.state.building}
                                onValueChange={(lang) => {

                                    this.setState({
                                        building: lang, floorId: "",
                                        floorIdData: [],
                                        roomData: [],
                                        roomId: "",
                                    });
                                    Ykt.utilitBindXiaoQuData(this.state.dormName, this.state.dormName, lang).then(function (ret) {
                                        page.setState({floorIdData: ret, floorId: ret[0].value});
                                    }).catch(function () {

                                    });

                                } }
                                mode='dropdown'
                            >
                                {this.state.buildingData.map((item, i) => {
                                    return this._renderPickerItem(item, i)
                                })}
                            </Picker>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.state.floorId}
                                onValueChange={(lang) => {
                                    this.setState({
                                        floorId: lang, roomData: [],
                                        roomId: "",
                                    });
                                    Ykt.utilitBindXiaoQuData(this.state.dormName, this.state.dormName, this.state.building, lang).then(function (ret) {
                                        page.setState({roomData: ret, roomId: ret[0].value});
                                    }).catch(function () {

                                    });
                                }}
                                mode='dropdown'
                            >
                                {this.state.floorIdData.map((item, i) => {
                                    return this._renderPickerItem(item, i)
                                })}
                            </Picker>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.state.roomId}
                                onValueChange={(lang) => {
                                    this.setState({roomId: lang});
                                }}
                                mode='dropdown'
                            >
                                {this.state.roomData.map((item, i) => {
                                    return this._renderPickerItem(item, i)
                                })}
                            </Picker>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.state.choosePayType}
                                onValueChange={(lang) => this.setState({choosePayType: lang})}
                                mode='dropdown'
                            >
                                <Picker.Item label="校园卡支付" value="1"/>
                                <Picker.Item label="银行卡支付" value="2"/>
                            </Picker>
                        </View>
                    </View>

                    <View style={{flexDirection: "column", marginTop: 15, backgroundColor: "#FFFFFF"}}>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>充值金额</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的充值金额"
                                keyboardType="numeric"
                                value={this.state.je} onChangeText={(text) => {
                                this.setState({je: text});
                            }}
                            />
                        </View>
                    </View>

                    <Button
                        small={true}
                        buttonStyle={{marginTop: 15, height: 35}}
                        color="white"
                        backgroundColor="#2196F3"
                        borderRadius={4}
                        fontSize={20}
                        title="充值"
                        onPress={this.chongzhi.bind(this)}
                    />
                    <BusyIndicator style={{zIndex: 10}}/>
                </View>
            );
        }else {
            const choosePayTypeArr=[{key:'校园卡支付',value:1},{key:'银行卡支付',value:2}];
            return (
                <View style={AppStyle.container}>

                    <View style={AppStyle.toolbar}>
                        <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5}
                                                                    onPress={this.pressBack.bind(this)}><Icon2
                            name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text
                            style={AppStyle.toolbarTitle}>校园一卡通</Text></View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 70, paddingRight: 10}}>

                        </View>
                    </View>

                    <View style={{flexDirection: "column", marginTop: 15, backgroundColor: "#FFFFFF"}}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }} onPress={()=>{
                            let arr=[];
                            for(var i=0;i<this.state.dormData.length;i++){
                                arr.push(this.state.dormData[i].name);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {
                                    this.setState({
                                        dormId: data, dormName: data, building: "",
                                        buildingData: [],
                                        floorId: "",
                                        floorIdData: [],
                                        roomData: [],
                                        roomId: "",
                                    });
                                    Ykt.utilitBindXiaoQuData(data, data).then(function (ret) {
                                        page.setState({buildingData: ret, building: ret[0].value});
                                    }).catch(function () {
                                    });

                                },
                                onPickerCancel: data => {
                                    console.log(data);
                                },
                                onPickerSelect: data => {
                                    console.log(data);
                                }
                            });
                            Pickerx.show();
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>{this.state.dormName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }} onPress={()=>{
                            let arr=[];
                            for(var i=0;i<this.state.buildingData.length;i++){
                                arr.push(this.state.buildingData[i].name);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<this.state.buildingData.length;i++){
                                        if(this.state.buildingData[i].name==data){
                                            this.setState({
                                                building: this.state.buildingData[i].value, floorId: "",
                                                floorIdData: [],
                                                roomData: [],
                                                roomId: "",
                                            });
                                            console.log( this.state.dormName+" "+this.state.buildingData[i].value);
                                            Ykt.utilitBindXiaoQuData(this.state.dormName, this.state.dormName, this.state.buildingData[i].value).then(function (ret) {

                                                page.setState({floorIdData: ret, floorId: ret[0].value});
                                            }).catch(function () {

                                            });
                                            break;
                                        }
                                    }
                                },
                                onPickerCancel: data => {
                                    console.log(data);
                                },
                                onPickerSelect: data => {
                                    console.log(data);
                                }
                            });
                            Pickerx.show();
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey2(this.state.building,this.state.buildingData)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }} onPress={()=>{
                            let arr=[];
                            for(var i=0;i<this.state.floorIdData.length;i++){
                                arr.push(this.state.floorIdData[i].name);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<this.state.floorIdData.length;i++){
                                        if(this.state.floorIdData[i].name==data){
                                            this.setState({
                                                floorId: this.state.floorIdData[i].value, roomData: [],
                                                roomId: "",
                                            });
                                            Ykt.utilitBindXiaoQuData(this.state.dormName, this.state.dormName, this.state.building, this.state.floorIdData[i].value).then(function (ret) {
                                                page.setState({roomData: ret, roomId: ret[0].value});
                                            }).catch(function () {

                                            });
                                            break;
                                        }
                                    }
                                },
                                onPickerCancel: data => {
                                    console.log(data);
                                },
                                onPickerSelect: data => {
                                    console.log(data);
                                }
                            });
                            Pickerx.show();
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey2(this.state.floorId,this.state.floorIdData)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }} onPress={()=>{
                            let arr=[];
                            for(var i=0;i<this.state.roomData.length;i++){
                                arr.push(this.state.roomData[i].name);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<this.state.roomData.length;i++){
                                        if(this.state.roomData[i].name==data){
                                            this.setState({roomId: this.state.roomData[i].value});
                                        }
                                    }
                                },
                                onPickerCancel: data => {
                                    console.log(data);
                                },
                                onPickerSelect: data => {
                                    console.log(data);
                                }
                            });
                            Pickerx.show();
                        }}><Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey2(this.state.roomId,this.state.roomData)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }} onPress={()=>{
                            let arr=[];
                            for(var i=0;i<choosePayTypeArr.length;i++){
                                arr.push(choosePayTypeArr[i].key);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<choosePayTypeArr.length;i++){
                                        if(choosePayTypeArr[i].key==data){
                                            this.setState({
                                                choosePayType: choosePayTypeArr[i].value,
                                            });
                                            break;
                                        }
                                    }
                                },
                                onPickerCancel: data => {
                                    console.log(data);
                                },
                                onPickerSelect: data => {
                                    console.log(data);
                                }
                            });
                            Pickerx.show();
                        }}><Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey(this.state.choosePayType,choosePayTypeArr)}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: "column", marginTop: 15, backgroundColor: "#FFFFFF"}}>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>充值金额</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的充值金额"
                                keyboardType="numeric"
                                value={this.state.je} onChangeText={(text) => {
                                this.setState({je: text});
                            }}
                            />
                        </View>
                    </View>

                    <Button
                        small={true}
                        buttonStyle={{marginTop: 15, height: 35}}
                        color="white"
                        backgroundColor="#2196F3"
                        borderRadius={4}
                        fontSize={20}
                        title="充值"
                        onPress={this.chongzhi.bind(this)}
                    />
                    <BusyIndicator style={{zIndex: 10}}/>
                </View>
            );
        }
    }
}