import React, {Component} from 'react';
import {View, Text, TouchableOpacity,TextInput,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ArtCommentService from './../../Service/ArtCommentService';
import AV from 'leancloud-storage';
import Toast from 'react-native-root-toast';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;
export default class UserCommentPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:''
        };
    }
    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    componentDidMount() {
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

    pressFinish(){
        var page=this;
        var currentUser = AV.User.current();
        if(this.state.text!=''){
            this.showLoading();
            if(this.props.toCommentObjId){
                ArtCommentService.addNewComment(currentUser.getObjectId(),currentUser.get('skey'),this.props.id,this.state.text,function () {
                    page.hideLoading();
                    const {navigator} = page.props;
                    if (navigator) {
                        navigator.pop();
                    }

                },function (err) {
                    page.showMsg(err);
                    page.hideLoading();
                },this.props.toCommentObjId);
            }else {
                ArtCommentService.addNewComment(currentUser.getObjectId(),currentUser.get('skey'),this.props.id,this.state.text,function () {
                    page.hideLoading();
                    const {navigator} = page.props;
                    if (navigator) {
                        navigator.pop();
                    }

                },function (err) {
                    page.showMsg(err);
                    page.hideLoading();
                });
            }

        }else {
            this.showMsg('评论不能为空');
        }

    }

    render() {
        let placeholder='';
        if(this.props.toCommentObjId){
            placeholder="回复 "+this.props.petName;
        }
        return (
            <View style={AppStyle.container}>
                <BusyIndicator style={{zIndex:999}}/>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>评论</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressFinish.bind(this)}><Text style={AppStyle.toolbarTitle}>完成</Text></TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={{height: 80, borderColor: 'gray',borderRadius:2,textAlignVertical:'top'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={placeholder}
                />

            </View>
        );
    }
}