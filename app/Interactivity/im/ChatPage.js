import React, { Component } from 'react';
import { View, Text,Platform,
  StyleSheet,TouchableOpacity,BackAndroid,InteractionManager
 } from 'react-native';
import AV from 'leancloud-storage';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import { addOnlineMessage,readMessage,deleteMessage } from './../../Actions/message';
import OthersPage from './../others/OthersPage';
var TextMessage = require('leancloud-realtime').TextMessage;
var Popover = require('react-native-popover');

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

class ChatPage extends Component{

    constructor(props) {
   super(props);
   this.state = {
     messages: [],
     loadEarlier: true,
     typingText: null,
     isLoadingEarlier: false,
       isVisible: false,
       buttonRect: {}
   };

   this._isMounted = false;
   this.onSend = this.onSend.bind(this);
   this.onReceive = this.onReceive.bind(this);
   this.renderCustomActions = this.renderCustomActions.bind(this);
   this.renderBubble = this.renderBubble.bind(this);
   this.renderFooter = this.renderFooter.bind(this);
   this.onLoadEarlier = this.onLoadEarlier.bind(this);

   this._isAlright = null;

        this.onMessage=this.onMessage.bind(this);
 }

    closePopover() {
        this.setState({isVisible: false});
    }

 componentWillMount() {
     let page=this;
     // 开始加载第一页历史记录
     this.setState((previousState) => {
       return {
         isLoadingEarlier: true,
       };
     });
     const { dispatch,conversations  } = this.props;
     this._isMounted = true;
     this.messageIterator = this.props.conversation.createMessagesIterator({ limit: 10 });
     this.messageIterator.next().then(function(result) {
         page.setState((previousState) => {
             return {
                 messages: GiftedChat.prepend(previousState.messages, page.msgAdpter(result.value)),
                 loadEarlier: !result.done,
                 isLoadingEarlier: false,
             };
         });
    }).catch(console.error.bind(console));
    //
     dispatch(readMessage(this.props.conversation.id));
    this.props.imClient.on('message',this.onMessage);


     // if (Platform.OS === 'android') {
     //     BackAndroid.addEventListener('hardwareBackPress', function () {
     //
     //         page.pressBack();
     //         return true;
     //     });
     // }
 }

 onMessage(message,conversation){
     this.onReceive(message);

 }

    componentWillUnmount() {



        this._isMounted = false;

        const { dispatch,conversations,navigator  } = this.props;
        dispatch(readMessage(this.props.conversation.id));
        this.props.imClient.off('message',this.onMessage);
    }

    onLoadEarlier() { // 加载历史
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });
        let page=this;
        this.messageIterator.next().then(function(result) {
            page.setState((previousState) => {
                return {
                    messages: GiftedChat.prepend(previousState.messages, page.msgAdpter(result.value)),
                    loadEarlier: !result.done,
                    isLoadingEarlier: false,
                };
            });
        }).catch(console.error.bind(console));
    }

    onSend(messages = []) {

        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        this.props.conversation.send(new TextMessage(messages[0].text));
    }

    onReceive(message) {
        let page=this;
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: message.id,
                    text: message.getText(),
                    createdAt: message.timestamp,
                    user: {
                        _id: message.from,
                        name: page.props.name,
                        avatar: page.props.headimg,
                    },
                }),
            };
        });
    }

    msgAdpter(messages){
        let result=[];
        for(let i=0;i<messages.length;i++){
            result.push({
                _id: messages[i].id,
                text: messages[i].getText(),
                createdAt: messages[i].timestamp,
                user: {
                    _id: messages[i].from,
                    name:  messages[i].from==AV.User.current().getObjectId()?AV.User.current().get('petName'):this.props.name,
                    avatar: messages[i].from==AV.User.current().getObjectId()?AV.User.current().get('headimg'):this.props.headimg,
                }
            })
        }
        return result.reverse();
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {},
        };
        return (
            <Actions
            {...props}
            options={options}
            />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#f0f0f0',
                }
            }}
            />
        );
    }

    renderCustomView(props) {
        return (
            <CustomView
            {...props}
            />
        );
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                {this.state.typingText}
                </Text>
                </View>
            );
        }
        return null;
    }

    pressBack() {
         const { dispatch,conversations,navigator  } = this.props;
        // this.props.imClient.on('message',function(message, conversation) {
        //     let lastTime = conversation.lastMessageAt.getTime();
        //     if(conversation.members.length==2){
        //         let fromId=conversation.members[0]==AV.User.current().getObjectId()?conversation.members[1]:conversation.members[0];
        //         let flat = false;
        //         for(let i=0;i<conversations.length;i++){ // 节省流量
        //             if(conversations[i].conversationId==conversation.id){
        //                 dispatch(addOnlineMessage(conversation.id,conversations[i].name,conversations[i].headimg,lastTime));
        //                 flat=true;
        //                 break;
        //             }
        //         }
        //         if(!flat){
        //             var query = new AV.Query('_User');
        //             query.get(fromId).then(function (data) {
        //                 let headimg = data.get('headimg');
        //                 let name = data.get('petName');
        //                 dispatch(addOnlineMessage(conversation.id,name,headimg,lastTime));
        //             });
        //         }
        //     } else {
        //         dispatch(addOnlineMessage(conversation.id,conversation.name,'',lastTime));
        //     }
        // });

        if (navigator) {
            navigator.pop();
        }

    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    render() {
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                        <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>{this.props.name}</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5}  ref='button'  onPress={this.showPopover.bind(this)}>
                            <Icon2 name="more-horiz" size={25} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
                _id: AV.User.current().getObjectId(), // sent messages should have same user._id
            }}

            />
                <Popover
                    style={{zIndex:999}}
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    placement="bottom"
                    onClose={this.closePopover.bind(this)}>
                    <View style={{width:120,flexDirection:'column',alignItems: 'center'}}>

                        <TouchableOpacity  activeOpacity={0.5} onPress={()=>{
                            if (this.props.navigator) {
                                this.props.navigator.push({
                                    name: 'OthersPage',
                                    component: OthersPage,
                                    params: {
                                        id: this.props.conversation.members[0]==AV.User.current().getObjectId()?this.props.conversation.members[1]:this.props.conversation.members[0]
                                    }
                                });
                            }
                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>
                            <Text >对方资料</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={0.5} onPress={()=>{
                            const { dispatch ,navigator } = this.props;

                            dispatch(deleteMessage(this.props.conversation.id));
                            if (navigator) {
                                InteractionManager.runAfterInteractions(() => {
                                    this.props.page&&this.props.page.Refresh();
                                });
                                navigator.pop();
                            }
                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>
                            <Text >删除对话</Text>
                        </TouchableOpacity>
                    </View>
                </Popover>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
        },
});

function select(store) {
    return {
        conversations: store.messageStore.conversation,
        imClient: store.appStore.imClient
    }
}

export default connect(select)(ChatPage);
