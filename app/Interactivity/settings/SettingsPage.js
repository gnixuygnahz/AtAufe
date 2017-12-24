/**
 * Created by anytime on 16/11/18.
 */
import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity,Platform,BackAndroid,Switch} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';
import WebPage from './../web/Web2Page';
import AppInitService from './../../Service/AppInitService';
import { StyleSheet } from 'react-native';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;
let realm = AppInitService.getRealm();
export default class SettingsPage extends Component {

    constructor(){
        super();


        this.state={
            MessageVibration:realm.objects('AppStorage').filtered('name = "MessageVibration"')[0].bool,
            IsPush:realm.objects('AppStorage').filtered('name = "IsPush"')[0].bool
        }
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

    render() {
        let realm = AppInitService.getRealm();
        let configs = realm.objects('Config');
        let feedback = configs.filtered('name = "feedback"');
        let instruction = configs.filtered('name = "instruction"');
        let about = configs.filtered('name = "about"');
        const {navigator} = this.props;
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>设置</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                    </View>
                </View>
                <List>
                    <View style={[style.items]}><Text>当前版本: 1.0</Text></View>
                    <View style={[style.items]}><Text style={{flex:1}}>震动提醒</Text><Switch value={this.state.MessageVibration} onValueChange={(text) => { this.setState({ MessageVibration: text });realm.write(() => {realm.objects('AppStorage').filtered('name = "MessageVibration"')[0].bool = text;});}}></Switch></View>
                    <View style={[style.items]}><Text style={{flex:1}}>推送</Text><Switch value={this.state.IsPush} onValueChange={(text) => { this.setState({ IsPush: text });realm.write(() => {realm.objects('AppStorage').filtered('name = "IsPush"')[0].bool = text;}); }}></Switch></View>
                </List>
            </View>
        );
    }
}
const style= StyleSheet.create({
    items:{
        backgroundColor:'#FFF',
        height:50,
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#ECECEC',
        paddingLeft:20
    }
});