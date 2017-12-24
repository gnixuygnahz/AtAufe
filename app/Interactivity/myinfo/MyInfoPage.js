import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity, Image,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import MyInfoEditPage from './MyInfoEditPage';
import AV from 'leancloud-storage';
import LoginPage from './../login/LoginPage';
import UserService from './../../Service/UserService';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class MyInfoPage extends Component {
    constructor(props) {
        super(props);
        var currentUser = AV.User.current();
        if (currentUser) {
            this.state = {
                petName: currentUser.get('petName'),
                signature: currentUser.get('signature'),
                profile: currentUser.get('profile'),
                headimg: currentUser.get('headimg'),
                XueYuan:currentUser.get('college'),
                ZhuanYe:currentUser.get('speciality'),
                opXueHao: currentUser.get('opXueHao'),
                BanJi:currentUser.get('class'),
                opName: currentUser.get('opName'),
                opSex: currentUser.get('opSex'),
                opXueYuan: currentUser.get('opXueYuan'),
                opZhuanYe: currentUser.get('opZhuanYe'),
                opBanJi: currentUser.get('opBanJi'),
                opKeCheng: currentUser.get('opKeCheng'),
                msg: '',
                followee: 0,
                follower: 0,
            };
        }
    }

    setName(name){
        this.setState({petName:name});
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
        let page=this;
        AV.User.current().followeeQuery().count().then(function (count) {
            page.setState({followee:count})
        });
        AV.User.current().followerQuery().count().then(function (count) {
            page.setState({follower:count})
        });
    }

    pressBack() {

        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    jumpToMyInfoEdit() {
        if (this.props.navigator) {
            this.props.navigator.push({
                name: 'MyInfoEditPage',
                component: MyInfoEditPage,
                params:{
                    page:this
                }
            });
        }
    }

    render() {
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}><Text style={AppStyle.toolbarTitle}>{this.state.petName}</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.jumpToMyInfoEdit.bind(this)}>
                            <View><Icon2 name="mode-edit" size={25} color={AppColor.toolbalIcon}/></View></TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    borderColor: '#E2E2E2',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    backgroundColor: '#FFFFFF'
                }}>
                    <View style={{flexDirection: 'row'}} alignItems="center">
                        <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15}}>
                            <View style={{backgroundColor: '#FFF', borderRadius: 72, height: 60, width: 60}}>
                                <Image source={{uri: this.state.headimg}} style={{flex: 1, borderRadius: 30,}} />
                            </View>
                        </View>
                        <View style={{marginLeft: 10, flex: 1, flexDirection: 'column'}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor: '#E1E1E1',
                                borderBottomWidth: 0.4,
                                height: 40,
                            }}>
                                <Text style={{marginTop: 10, fontWeight: 'bold',}}>{this.state.signature}</Text>
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
                                        <Text style={{fontSize: 10}}>我关注的人</Text>
                                    </Col>
                                    <Col sm={1} md={4} lg={3}>
                                        <Text style={{fontSize: 10}}>关注我的人</Text>
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
                    }}>{this.state.profile}</Text>
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
                        <Text style={{marginRight: 15,}}> 专业</Text><Text numberOfLines={3} style={{
                        flex: 1,
                        marginRight: 15
                    }}>{this.state.ZhuanYe}</Text>
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
                        <Text style={{marginRight: 15,}}> 学院</Text><Text numberOfLines={3} style={{
                        flex: 1,
                        marginRight: 15
                    }}>{this.state.XueYuan}</Text>
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
                        <Text style={{marginRight: 15,}}> 班级</Text><Text numberOfLines={3} style={{
                        flex: 1,
                        marginRight: 15
                    }}>{this.state.BanJi}</Text>
                    </View>
                </View>

                <View style={{
                    borderColor: '#E2E2E2',
                    borderTopWidth: 0,
                    borderBottomWidth: 1,
                    backgroundColor: '#FFFFFF',
                    marginTop: 11
                }}>
                    <View style={{flexDirection: 'row',height: 43,borderWidth: 0}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=> {
                            UserService.loginOut();
                            if (this.props.navigator) {
                                this.props.navigator.resetTo({
                                    name: 'LoginPage',
                                    component: LoginPage,
                                });
                            }
                        }} style={{flex: 1,paddingTop: 4,
                            paddingBottom: 4,
                            borderColor: '#00000000',
                            borderBottomWidth: 0,
                            height: 43,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'}}>

                                <Text style={{color: 'grey',fontSize:14}}>退出登陆</Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
}
