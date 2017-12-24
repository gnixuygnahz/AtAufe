import React, { Component } from 'react';
import { View ,Text, TouchableOpacity, Image,Platform,BackAndroid} from 'react-native';
import AV from 'leancloud-storage';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import OthersCon from './OthersCon';
import Toast from 'react-native-root-toast';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ChatPage from './../im/ChatPage';
import { connect } from 'react-redux';
import AppInitSerice from './../../Service/AppInitService';
var Popover = require('react-native-popover');

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

class OthersPage extends Component{

    constructor(props){
        super(props);
        this.state={
            info:{},
            isVisible: false,
            buttonRect: {},
            isFollow: false,
            followee: 0,
            follower: 0,
        };
    }

    componentWillMount(){
        this.con=new OthersCon(this);
        this.con.init(this.props.id);
        let user=AV.User.current();
        if(user) {
            let realm = AppInitSerice.getRealm();
            let hondas = realm.objects('Followee').filtered('id = "'+this.props.id+'"');
            if(hondas.length>0){

                this.setState({
                    isFollow: true
                });
            }
        }

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

        let page=this;
        AV.Object.createWithoutData('_User', this.props.id).followeeQuery().count().then(function (count) {
            page.setState({followee:count})
        });
        AV.Object.createWithoutData('_User', this.props.id).followerQuery().count().then(function (count) {
            page.setState({follower:count})
        });
    }

    setInfo(info){
        this.setState({info:info});
    }

    pressBack() {

        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    chat(){
        let page=this;
        if (this.props.navigator) {
            this.props.imClient.createConversation({
                members: [this.props.id],
                unique: true,
            }).then(function(conversation) {
                page.props.navigator.push({
                    name: 'ChatPage',
                    component: ChatPage,
                    params: {
                        conversation: conversation,
                        name: page.state.info.petName,
                        headimg: page.state.info.headimg,
                    }
                });
            }).catch(console.error.bind(console));

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
        }, 0);
    }


    renderInfo(bool,info,value){
        if(bool){
            return (
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    paddingBottom: 7,
                    marginTop: 10,
                    borderColor: '#E1E1E1',
                    marginRight: 15,
                    marginLeft: 15,
                    borderBottomWidth: 0.4,
                }}>
                    <Text style={{marginRight: 15,}}> {info}</Text><Text numberOfLines={3} style={{
                    flex: 1,
                    marginRight: 15
                }}>{value}</Text>
                </View>
            );
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

    closePopover() {
        this.setState({isVisible: false});
    }

    render(){
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>{this.state.info.petName}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 70, paddingRight: 10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.chat.bind(this)} style={{paddingRight: 10}}><Icon2 name="chat" size={25} color={AppColor.toolbalIcon} /></TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} ref='button' onPress={this.showPopover.bind(this)} ><Icon2 name="more-horiz" size={25} color={AppColor.toolbalIcon}/></TouchableOpacity>
                    </View>
                </View>


                <View style={{
                    borderColor: '#E2E2E2',
                    borderTopWidth: 0.4,
                    borderBottomWidth: 0.4,
                    backgroundColor: '#FFFFFF'
                }}>
                    <View style={{flexDirection: 'row'}} alignItems="center">
                        <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15}}>
                            <View style={{backgroundColor: '#000', borderRadius: 72, height: 60, width: 60}}><Image
                                source={{uri: this.state.info.headimg}} style={{flex: 1, borderRadius: 72,}}></Image></View>
                        </View>
                        <View style={{marginLeft: 10, flex: 1, flexDirection: 'column'}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor: '#E1E1E1',
                                borderBottomWidth: 0.4,
                                height: 40,
                            }}>
                                <Text style={{marginTop: 10, fontWeight: 'bold',}}>{this.state.info.signature}</Text>
                            </View>
                            <View style={{flex: 1, marginTop: 7, marginBottom: 7}}>
                                <Row size={3}>

                                    <Col sm={1} md={4} lg={3}>
                                        <Text style={{fontSize: 14, fontWeight: 'bold',}}>{this.state.followee}</Text>
                                    </Col>
                                    <Col sm={1} md={4} lg={3}>
                                        <Text style={{fontSize: 14, fontWeight: 'bold',}}>{this.state.follower}</Text>
                                    </Col>
                                </Row>
                                <Row size={3}>

                                    <Col sm={1} md={4} lg={3}>
                                        <Text style={{fontSize: 10}}>他关注的人</Text>
                                    </Col>
                                    <Col sm={1} md={4} lg={3}>
                                        <Text style={{fontSize: 10}}>关注他的人</Text>
                                    </Col>
                                </Row>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        paddingBottom: 7,
                        marginTop: 10,
                        borderColor: '#E1E1E1',
                        marginRight: 15,
                        marginLeft: 15,
                        borderBottomWidth: 0.4,
                    }}>
                        <Text style={{marginRight: 15,}}>个人简介</Text><Text numberOfLines={3} style={{
                        flex: 1,
                        marginRight: 15
                    }}>{this.state.info.profile}</Text>
                    </View>

                    {this.renderInfo(this.state.info.opXueHao,'学号',this.state.info.xuehao)}
                    {this.renderInfo(this.state.info.opName,'姓名',this.state.info.name)}
                    {this.renderInfo(this.state.info.opSex,'性别',this.state.info.sex)}
                    {this.renderInfo(this.state.info.opXueYuan,'学院',this.state.info.xueyuan)}
                    {this.renderInfo(this.state.info.opZhuanYe,'专业',this.state.info.zhuanye)}
                    {this.renderInfo(this.state.info.opBanJi,'班级',this.state.info.banji)}

                </View>
                <Popover
                    style={{zIndex:999}}
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    placement="bottom"
                    onClose={this.closePopover.bind(this)}>
                    <View style={{width:120,flexDirection:'column',alignItems: 'center'}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            let user=AV.User.current();
                            let page=this;
                            if(user) {
                                if(this.state.isFollow){
                                    AV.User.current().unfollow(this.props.id).then(function(){
                                        page.showMsg("已取消关注");

                                        let realm = AppInitSerice.getRealm();
                                        let hondas = realm.objects('Followee').filtered('id = "'+page.props.id+'"');
                                        if(hondas.length>0){

                                            realm.write(() => {
                                                realm.delete(hondas);
                                            });
                                        }
                                        page.setState({
                                            isFollow:false
                                        });

                                    }, function(err){
                                        page.showMsg("操作失败");
                                        console.dir(err);
                                    });
                                }else{
                                    AV.User.current().follow(this.props.id).then(function(){
                                        page.showMsg("关注成功");

                                        let realm = AppInitSerice.getRealm();
                                        realm.write(() => {
                                            realm.create('Followee', {
                                                id: page.props.id,
                                                petName: page.state.info.petName,
                                                headimg: page.state.info.headimg
                                            });
                                        });
                                        page.setState({
                                            isFollow:true
                                        });

                                    }, function(err){
                                        page.showMsg("关注失败");
                                        console.dir(err);
                                    });
                                }
                            }

                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center',borderBottomWidth:1,borderColor:'#EBEBF1'}}>
                            <Text >{this.state.isFollow?"取消关注":"关注"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  activeOpacity={0.5} onPress={()=>{

                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>
                            <Text >举报</Text>
                        </TouchableOpacity>

                    </View>
                </Popover>
            </View>
        );
    }
}
function select(store) {
    return {
        imClient: store.appStore.imClient
    }
}

export default connect(select)(OthersPage);
