import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity,ScrollView} from 'react-native';
import MyInfoPage from './../myinfo/MyInfoPage';
import {List, ListItem} from 'react-native-elements';
import HelpPage from './HelpPage';
import ConvListPage from './../im/ConvListPage';
import UpdatePage from './UpdatePage';
import FollowPage from './FollowPage';
import HistoryPage from './HistoryPage';
import SettingsPage from '../settings/SettingsPage';
import { connect } from 'react-redux';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

class MyPage extends Component {

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.petName!==this.props.petName){
            return true;
        }
        if(nextProps.headimg!==this.props.headimg){
            return true;
        }
        return false;
    }

    render() {
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 40}}>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>我的</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 40,paddingRight:10}}>
                    </View>
                </View>
                <ScrollView style={{flex:1}}>
                <List containerStyle={{borderColor: '#E3E7F1',borderTopWidth:0.5}}>
                <ListItem
                    roundAvatar
                    key={0}
                    titleStyle={{color:'#60729B'}}
                    title={this.props.petName}
                    subtitle={'查看或编辑个人资料'}
                    avatar={{uri:this.props.headimg}}
                    onPress={()=>{
                        if (this.props.navigator) {
                            this.props.navigator.push({
                                name: 'MyInfoPage',
                                component: MyInfoPage,
                            });
                        }
                    }}
                />
                    </List>
                <List containerStyle={{borderColor: '#E3E7F1',}}>


                    <ListItem
                        key={1}
                        title={'我的关注'}
                        titleStyle={{color:'#60729B'}}
                        icon={{name: 'turned-in-not',color:'#60729B'}}

                        onPress={()=> {
                            const { navigator } = this.props;
                            if(navigator) {
                                navigator.push({
                                    name: 'FollowPage',
                                    component: FollowPage
                                });
                            }
                        }}
                    />
                    <ListItem
                        key={2}
                        title={'我的消息'}
                        titleStyle={{color:'#60729B'}}
                        icon={{name: 'notifications-none',color:'#60729B'}}
                        onPress={()=> {
                            const { navigator } = this.props;
                            if(navigator) {
                                navigator.push({
                                    name: 'ConvListPage',
                                    component: ConvListPage
                                });
                            }
                        }}
                    />
                    <ListItem
                        key={3}
                        title={'浏览历史'}
                        titleStyle={{color:'#60729B'}}
                        icon={{name: 'restore',color:'#60729B'}}
                        onPress={()=> {
                            const { navigator } = this.props;
                            if(navigator) {
                                navigator.push({
                                    name: 'HistoryPage',
                                    component: HistoryPage
                                });
                            }
                        }}
                    />
                </List>

                <List containerStyle={{borderColor: '#E3E7F1'}}>

                    <ListItem
                        key={4}
                        title={'更新数据'}
                        titleStyle={{color:'#60729B'}}
                        icon={{name: 'system-update-alt',color:'#60729B'}}
                        onPress={()=> {
                            const { navigator } = this.props;
                            if(navigator) {
                                navigator.push({
                                    name: 'UpdatePage',
                                    component: UpdatePage
                                });
                            }
                        }}
                    />
                    <ListItem
                        key={5}
                        title={'帮助与反馈'}
                        titleStyle={{color:'#60729B'}}
                        icon={{name: 'help-outline',color:'#60729B'}}
                        onPress={()=> {
                            if (this.props.navigator) {
                                this.props.navigator.push({
                                    name: 'HelpPage',
                                    component: HelpPage,
                                });
                            }
                        }}
                    />
                    <ListItem
                        key={6}
                        title={'设置'}
                        titleStyle={{color:'#60729B'}}
                        icon={{name: 'settings',color:'#60729B'}}
                        onPress={()=> {
                            if (this.props.navigator) {
                                this.props.navigator.push({
                                    name: 'SettingsPage',
                                    component: SettingsPage,
                                });
                            }
                        }}
                    />
                </List>
                </ScrollView>
            </View>
        );
    }
}

function select(store) {
    return {
        petName: store.appStore.petName,
        headimg: store.appStore.headimg
    }
}

export default connect(select)(MyPage);