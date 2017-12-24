import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity,TextInput,Switch, Platform,Image,BackAndroid,Alert} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import AV from 'leancloud-storage';
import MyInfoEditCon from './MyInfoEditCon';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { setUserInfo } from './../../Actions/app';

let myInfoEditCon={};
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

class MyInfoEidtPage extends Component {

    constructor(props) {
        super(props);
        var currentUser=AV.User.current();
        if (currentUser) {
            this.state = {
                petName: currentUser.get('petName'),
                signature: currentUser.get('signature'),
                profile: currentUser.get('profile'),
                headimg: currentUser.get('headimg'),
                opXueHao: currentUser.get('opXueHao'),
                opName: currentUser.get('opName'),
                opSex: currentUser.get('opSex'),
                opXueYuan: currentUser.get('opXueYuan'),
                opZhuanYe: currentUser.get('opZhuanYe'),
                opBanJi: currentUser.get('opBanJi'),
                opKeCheng: currentUser.get('opKeCheng'),
                msg: '',
            };
        }
    }
    componentDidMount() {
        myInfoEditCon = new MyInfoEditCon(this);

        // const {navigator} = this.props;
        // if (Platform.OS === 'android') {
        //     BackAndroid.addEventListener('hardwareBackPress', function () {
        //
        //         if (navigator) {
        //             navigator.pop();
        //         }
        //         return true;
        //     });
        // }
    }



    refresh(){
        var currentUser=AV.User.current();
        this.setState({
            petName: currentUser.get('petName'),
            signature: currentUser.get('signature'),
            profile: currentUser.get('profile'),
            headimg: currentUser.get('headimg'),
            opXueHao: currentUser.get('opXueHao'),
            opName: currentUser.get('opName'),
            opSex: currentUser.get('opSex'),
            opXueYuan: currentUser.get('opXueYuan'),
            opZhuanYe: currentUser.get('opZhuanYe'),
            opBanJi: currentUser.get('opBanJi'),
            opKeCheng: currentUser.get('opKeCheng'),
        });

        const { dispatch } = this.props;
        dispatch(setUserInfo(currentUser.getObjectId(),currentUser.get('petName'), currentUser.get('headimg')));
        this.props.page.setName(this.state.petName);
        this.pressBack();
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

    pressFinish(){

        myInfoEditCon.updateUserInfo(this.state);
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

    pickImage(){
        var options = {
            title: '选择头像',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '相册',
            cancelButtonTitle: '取消',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                    myInfoEditCon.updateHeadimg(source.uri);
                } else {

                    const source = {uri: response.uri, isStatic: true};
                    myInfoEditCon.updateHeadimg(response.path);
                }

            }
        });
    }



    render() {
        return (
            <View style={AppStyle.container}>

                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>编辑个人资料</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressFinish.bind(this)}><Text style={AppStyle.toolbarTitle}>完成</Text></TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    borderColor: '#E2E2E2',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    paddingBottom:10,
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF'
                }}>
                    <View style={{flexDirection: 'row'}} alignItems="center" >
                        <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15,flexDirection: 'column',alignItems: 'center'}}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.pickImage.bind(this)}><View style={{ borderRadius: 30, height: 60, width: 60}}><Image source={{uri:this.state.headimg}} style={{flex:1,borderRadius: 30,  }}></Image></View></TouchableOpacity>
                            <Text style={{fontSize:10,marginTop:10}}>编辑</Text>
                        </View>
                        <View style={{marginLeft: 10, flex: 1, flexDirection: 'column'}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor: '#E1E1E1',
                                borderBottomWidth: 0.4,
                                height: 40,
                            }}>
                                <TextInput underlineColorAndroid="transparent" style={{ fontWeight: 'bold',flex:1,color:"#515151"}} value={this.state.petName} onChangeText={(text) => { this.setState({ petName: text }); }} ></TextInput>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor: '#E1E1E1',
                                borderBottomWidth: 1,
                                height: 40,flex: 1, marginTop: 7, marginBottom: 17,
                            }}>
                                <TextInput underlineColorAndroid="transparent" style={{ fontWeight: 'bold',flex:1}} placeholder="一句话介绍自己" placeholderTextColor='#E4E4E4' value={this.state.signature} onChangeText={(text) => { this.setState({ signature: text }); }}></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={{borderColor: '#E1E1E1',marginLeft:15,height: 40, borderBottomWidth: 1}}>
                        <TextInput underlineColorAndroid="transparent" style={{ fontWeight: 'bold',flex:1}} placeholder="个人简介(用一段话介绍自己)" placeholderTextColor='#E4E4E4' value={this.state.profile} onChangeText={(text) => { this.setState({ profile: text }); }}></TextInput>
                    </View>
                </View>

                <View style={{
                    borderColor: '#E2E2E2',
                    borderTopWidth: 1,
                    borderBottomWidth: 0.4,
                    backgroundColor: '#FFFFFF',
                    marginTop: 11
                }}>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}}>是否公开</Text>

                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}}>学号</Text>
                            <Switch value={this.state.opXueHao} onValueChange={(text) => { this.setState({ opXueHao: text }); }}></Switch>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}}>姓名</Text>
                            <Switch value={this.state.opName} onValueChange={(text) => { this.setState({ opName: text }); }}></Switch>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}}>性别</Text>
                            <Switch value={this.state.opSex} onValueChange={(text) => { this.setState({ opSex: text }); }}></Switch>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}}>学院</Text>
                            <Switch value={this.state.opXueYuan} onValueChange={(text) => { this.setState({ opXueYuan: text }); }}></Switch>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}} >专业</Text>
                            <Switch value={this.state.opZhuanYe} onValueChange={(text) => { this.setState({ opZhuanYe: text }); }}></Switch>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}} alignItems="center">

                        <View style={{
                            marginLeft: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#C9C7CD',
                            borderBottomWidth: 0.4,
                            flex: 1,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1}}>班级</Text>
                            <Switch value={this.state.opBanJi} onValueChange={(text) => { this.setState({ opBanJi: text }); }}></Switch>
                        </View>

                    </View><View style={{flexDirection: 'row'}} alignItems="center">

                    <View style={{
                        marginLeft: 15,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderColor: '#C9C7CD',
                        borderBottomWidth: 0,
                        flex: 1,
                        height: 43,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{flex: 1}}>课程</Text>
                        <Switch value={this.state.opKeCheng} onValueChange={(text) => { this.setState({ opKeCheng: text }); }}></Switch>
                    </View>

                </View>
                </View>
                <BusyIndicator style={{zIndex:10}} />
            </View>
        );
    }
}


function select(store) {
    return {
    }
}

export default connect(select)(MyInfoEidtPage);