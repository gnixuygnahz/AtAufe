import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Platform,BackAndroid,Alert,InteractionManager } from 'react-native';
import CloudList from './../../UICom/CloudList';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import ChatPage from './../im/ChatPage';
import { deleteMessage } from './../../Actions/message';
var Swipeout = require('react-native-swipeout');

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

class ConvListPage extends Component{

    constructor(props){
        super(props);
        this.Refresh=this.Refresh.bind(this);
    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    Refresh(){
        this.refs.list._onRefresh();
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

    render(){
        const { dispatch  } = this.props;

        return (
            <View style={AppStyle.container}>
            <View style={AppStyle.toolbar}>
                <View style={{width: 70}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                        <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>列表</Text></View>
                <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>

                </View>
            </View>
            <List>
            <CloudList
                ref="list"
                pageSize={15}
                dataLoad={(limit,skip,fun)=>{
                    fun(this.props.conversation.slice(skip,limit));
                }}
                onEndReachedThreshold={10}
                renderRow={(rowData,i)=>{
                    let page=this;
                    return (
                        <Swipeout
                            autoClose={true}
                            right={[{
                                text: '删除',
                                backgroundColor: '#FF5151',
                                onPress: function () {
                                    dispatch(deleteMessage(rowData.conversationId));
                                    InteractionManager.runAfterInteractions(() => {
                                        page.Refresh();
                                    });

                                }
                            }]}>
                        <ListItem
                        roundAvatar
                        key={i}
                        title={rowData.name}
                        subtitle={rowData.unReadNum==0?"已读":"未读消息 "+rowData.unReadNum+" 条"}
                        avatar={{uri:rowData.headimg}}
                        onPress={()=>{
                            let page=this;
                            if (this.props.navigator) {
                                this.props.imClient.getConversation(rowData.conversationId).then(function(conversation) {
                                    page.props.navigator.push({
                                        name: 'ChatPage',
                                        component: ChatPage,
                                        params: {
                                            conversation: conversation,
                                            name: rowData.petName,
                                            headimg: rowData.headimg,
                                            page:page
                                        }
                                    });
                                }).catch(console.error.bind(console));

                            }
                        }}
                        />
                        </Swipeout>
                        );
                }}
            />
            </List>
            </View>
        );
    }
}

function select(store) {
    return {
        conversation: store.messageStore.conversation,
        imClient: store.appStore.imClient
    }
}

export default connect(select)(ConvListPage);
