/**
 * Created by anytime on 16/11/16.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,TextInput,
    Image,Alert,Platform,
    TouchableOpacity,Interactionmanager,Picker } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Button,CheckBox } from 'react-native-elements';
import HqbxSerivce from './../../../Service/HqbxService';
import { List, ListItem } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import AV from 'leancloud-storage';
import Pickerx from 'react-native-picker';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let AppStyle = require('./../../../UICom/StyleManager').Style;
let AppColor = require('./../../../UICom/StyleManager').Color;

const campusArr=[{value:1,key:'东校区'},{key:'西校区',value:2}];
const typeArr=[{value:1,key:'木工维修'},{key:'电路维修',value:2},{value:3,key:'饮水机维修'},{value:4,key:'水路维修'},{value:5,key:'桌椅维修'},{value:6,key:'门窗维修'}];
const Hqbx=new HqbxSerivce();
export default class HqbxPage extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            campusID:"1",
            address:"",
            buildingID:"",
            buildingData:[],
            time:"",
            phone:"",
            typeID:"1",
            repairContent:"",
            yzm:"",
            yzmimg:"a"
        };
        this.renderKey=this.renderKey.bind(this);
        this.renderKey2=this.renderKey2.bind(this);
    }

    componentDidMount() {
        this._init();
    }

    async _init(){
        let bool = await Hqbx.login(AV.User.current().getUsername(), AV.User.current().get("pwd"));
        if(bool){
            let a=await Hqbx.getBuildings("1");
            let img = await Hqbx.getYZM();
            this.setState({yzmimg:img,buildingData:a,buildingID:a[0].id});
        }else{
            this.showMsg("登录失败");
        }

    }

    async chongzhi(){
        this.showLoading();
        var bool = await Hqbx.postRepair(this.state.name,this.state.campusID,this.state.address,this.state.buildingID,this.state.time,this.state.phone,this.state.typeID,this.state.repairContent,this.state.yzm);
        this.hideLoading();
        if(bool){
            this.showMsg("提交成功");
        }else{
            this.showMsg("提交失败");
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

    renderKey(value,data){

        for(var i=0;i<data.length;i++){
            if(data[i].value==value){

                return data[i].key;
            }
        }
    }

    renderKey2(value,data){
        for(var i=0;i<data.length;i++){
            if(data[i].id==value){
                return data[i].buildingNo+"("+data[i].alias+")";
            }
        }
    }

    _renderPickerItem(data,i){
        return (<Picker.Item key={data.id} label={data.buildingNo+"("+data.alias+")"} value={data.id} />);
    }

    render(){
        var page = this;

        if(Platform.OS=='android') {
            return (
                <View style={AppStyle.container}>
                    <BusyIndicator style={{zIndex: 10}}/>
                    <View style={AppStyle.toolbar}>
                        <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5}
                                                                    onPress={this.pressBack.bind(this)}><Icon2
                            name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text
                            style={AppStyle.toolbarTitle}>后勤报修</Text></View>
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
                                selectedValue={this.state.campusID}
                                onValueChange={(lang) => {
                                    this.setState({
                                        campusID: lang,
                                        buildingData: [],
                                    });
                                    Hqbx.getBuildings(lang).then(function (ret) {

                                        page.setState({buildingData: ret, buildingID: ret[0].id});
                                    }).catch(function () {

                                    });
                                }}
                                mode='dropdown'
                            >
                                <Picker.Item label="东校区" value="1"/>
                                <Picker.Item label="西校区" value="2"/>
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
                                selectedValue={this.state.buildingID}
                                onValueChange={(lang) => {
                                    this.setState({buildingID: lang});
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
                                selectedValue={this.state.typeID}
                                onValueChange={(lang) => this.setState({typeID: lang})}
                                mode='dropdown'
                            >
                                <Picker.Item label="木工维修" value="1"/>
                                <Picker.Item label="电路维修" value="2"/>
                                <Picker.Item label="饮水机维修" value="3"/>
                                <Picker.Item label="水路维修" value="4"/>
                                <Picker.Item label="桌椅维修" value="5"/>
                                <Picker.Item label="门窗维修" value="6"/>
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
                            <Text style={{marginLeft: 15, marginRight: 15}}>姓名</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的姓名"
                                keyboardType="numeric"
                                value={this.state.name} onChangeText={(text) => {
                                this.setState({name: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>地址</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入地址"
                                keyboardType="numeric"
                                value={this.state.address} onChangeText={(text) => {
                                this.setState({address: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>时间</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入时间"
                                keyboardType="numeric"
                                value={this.state.time} onChangeText={(text) => {
                                this.setState({time: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>电话</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的电话"
                                keyboardType="numeric"
                                value={this.state.phone} onChangeText={(text) => {
                                this.setState({phone: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>描述</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的描述"
                                keyboardType="numeric"
                                value={this.state.repairContent} onChangeText={(text) => {
                                this.setState({repairContent: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>验证码</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入验证码"
                                value={this.state.yzm} onChangeText={(text) => {
                                this.setState({yzm: text});
                            }}
                            />
                            <Image style={{height: 30, width: 70}} source={{uri: this.state.yzmimg}}/>
                        </View>
                    </View>

                    <Button
                        small={true}
                        buttonStyle={{marginTop: 15, height: 35}}
                        color="white"
                        backgroundColor="#2196F3"
                        borderRadius={4}
                        fontSize={20}
                        title="提交"
                        onPress={this.chongzhi.bind(this)}
                    />
                </View>
            );
        }else{
            return (
                <View style={AppStyle.container}>
                    <BusyIndicator style={{zIndex: 10}}/>
                    <View style={AppStyle.toolbar}>
                        <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5}
                                                                    onPress={this.pressBack.bind(this)}><Icon2
                            name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text
                            style={AppStyle.toolbarTitle}>后勤报修</Text></View>
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
                            for(var i=0;i<campusArr.length;i++){
                                arr.push(campusArr[i].key);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<campusArr.length;i++){
                                        if(campusArr[i].key==data){
                                            this.setState({
                                                campusID: campusArr[i].value,
                                                buildingData: [],
                                            });
                                            Hqbx.getBuildings(campusArr[i].value).then(function (ret) {
                                                page.setState({buildingData: ret, buildingID: ret[0].id});
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
                        }}><Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey(this.state.campusID,campusArr)}</Text>
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
                                arr.push(this.state.buildingData[i].buildingNo+"("+this.state.buildingData[i].alias+")");
                            }
                            console.log(this.state.buildingData);
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<this.state.buildingData.length;i++){
                                        if(this.state.buildingData[i].buildingNo+"("+this.state.buildingData[i].alias+")"==data){
                                            this.setState({
                                                buildingID: this.state.buildingData[i].id,
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
                            <Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey2(this.state.buildingID,this.state.buildingData)}</Text>
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
                            for(var i=0;i<typeArr.length;i++){
                                arr.push(typeArr[i].key);
                            }
                            Pickerx.init({
                                pickerData: arr,
                                selectedValue: [arr[0]],
                                onPickerConfirm: data => {

                                    for(var i=0;i<typeArr.length;i++){
                                        if(typeArr[i].key==data){
                                            this.setState({
                                                typeID: typeArr[i].value,
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
                        }}><Text style={{marginLeft: 15, marginRight: 15}}>{this.renderKey(this.state.typeID,typeArr)}</Text>
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
                            <Text style={{marginLeft: 15, marginRight: 15}}>姓名</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的姓名"
                                keyboardType="numeric"
                                value={this.state.name} onChangeText={(text) => {
                                this.setState({name: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>地址</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入地址"
                                keyboardType="numeric"
                                value={this.state.address} onChangeText={(text) => {
                                this.setState({address: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>时间</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入时间"
                                keyboardType="numeric"
                                value={this.state.time} onChangeText={(text) => {
                                this.setState({time: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>电话</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的电话"
                                keyboardType="numeric"
                                value={this.state.phone} onChangeText={(text) => {
                                this.setState({phone: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#E3E7F1'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>描述</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入您的描述"
                                keyboardType="numeric"
                                value={this.state.repairContent} onChangeText={(text) => {
                                this.setState({repairContent: text});
                            }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFFFFF",
                            height: 40,
                            alignItems: 'center'
                        }}>
                            <Text style={{marginLeft: 15, marginRight: 15}}>验证码</Text>
                            <TextInput
                                style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1}}
                                underlineColorAndroid="transparent"
                                placeholder="请输入验证码"
                                value={this.state.yzm} onChangeText={(text) => {
                                this.setState({yzm: text});
                            }}
                            />
                            <Image style={{height: 30, width: 70}} source={{uri: this.state.yzmimg}}/>
                        </View>
                    </View>

                    <Button
                        small={true}
                        buttonStyle={{marginTop: 15, height: 35}}
                        color="white"
                        backgroundColor="#2196F3"
                        borderRadius={4}
                        fontSize={20}
                        title="提交"
                        onPress={this.chongzhi.bind(this)}
                    />
                </View>
            );
        }
    }

}