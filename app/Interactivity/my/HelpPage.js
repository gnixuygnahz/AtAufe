import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';
import WebPage from './../web/Web2Page';
import AppInitService from './../../Service/AppInitService';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class HelpPage extends Component {

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
                        <Text style={AppStyle.toolbarTitle}>帮助与反馈</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                    </View>
                </View>

                <List>
                    <ListItem
                        key={4}
                        title={'使用帮助'}
                        icon={{name: 'system-update-alt',color:'#60729B'}}
                        titleStyle={{color:'#60729B'}}
                        onPress={()=> {
                            navigator.push({
                                name: 'WebPage',
                                component: WebPage,
                                params: {
                                    id: instruction[0].value
                                }
                            });
                        }}
                    />
                    <ListItem
                        key={5}
                        title={'关于我们'}
                        icon={{name: 'help-outline',color:'#60729B'}}
                        titleStyle={{color:'#60729B'}}
                        onPress={()=> {
                            navigator.push({
                                name: 'WebPage',
                                component: WebPage,
                                params: {
                                    id: about[0].value
                                }
                            });
                        }}
                    />
                    <ListItem
                        key={6}
                        title={'反馈'}
                        icon={{name: 'settings',color:'#60729B'}}
                        titleStyle={{color:'#60729B'}}
                        onPress={()=> {
                            navigator.push({
                                name: 'WebPage',
                                component: WebPage,
                                params: {
                                    id: feedback[0].value
                                }
                            });
                        }}
                    />
                </List>
            </View>
        );
    }
}
