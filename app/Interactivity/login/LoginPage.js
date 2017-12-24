import LoginCon from './LoginCon';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import MainPage from './../main/MainPage.js';
import { StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions,
    PixelRatio,KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import NotificationService from './../../Service/NotificationService';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const img = require('./../../Asset/login/img/loginlogo.png');

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    input: {
        height: PixelRatio.getPixelSizeForLayoutSize(18),
        flex: 1,
    },
});

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zh: '',
            pwd: '',
            yzm: '',
            img: '',

            hideYZM: true

        };
    }

    jumpToMain() { // 跳转Main行为
        if (this.props.navigator) {
            this.props.navigator.resetTo({
                name: 'MainPage',
                component: MainPage,
            });
        }
    }




    componentDidMount() {
        this.login = new LoginCon(this);
    }
    showYZM() {
        this.setState({hideYZM: false});
    }
    hideYZM() {
        this.setState({hideYZM: true});
    }

    setYZM(yzm) {
        this.setState({ img: yzm });
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




    render() {
        const imgW = Dimensions.get('window').width / 2;
        const imgH = (imgW / 6) * 5;

        const a = PixelRatio.getPixelSizeForLayoutSize(70);

        return (
            <View style={{flex:1,flexDirection: 'column', justifyContent: 'center'}}>
            <View style={[styles.back, { flexDirection: 'column', justifyContent: 'center',zIndex:1 }]}>


                    <View
                        style={{
                            flexDirection: 'row',

                            height: imgH,
                            justifyContent: 'center',
                            paddingBottom: a,
                        }}
                    >
                        <Image
                            source={img}
                            style={{ height: imgH, width: imgW }}
                        />
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={50}
                        style={{
                            marginLeft: 20,
                            marginRight: 20,
                            alignItems: 'stretch',
                            flexDirection: 'column',
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="perm-identity" size={20} color="grey" />
                            <TextInput style={styles.input} placeholder={'教务账号'} value={this.state.zh} onChangeText={(text) => { this.setState({ zh: text }); }}/>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="lock-outline" size={20} color="grey" />
                            <TextInput
                                style={styles.input}
                                placeholder={'密码'}
                                secureTextEntry={true}
                                value={this.state.pwd} onChangeText={(text) => { this.setState({ pwd: text }); }}
                            />
                        </View>
                        {this.state.hideYZM?(null):(<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="lock-outline" size={20} color="grey" />
                            <TextInput
                                style={styles.input}
                                placeholder={'验证码'}
                                value={this.state.yzm} onChangeText={(text) => { this.setState({ yzm: text }); }}
                            />
                            <Image source={{ uri: this.state.img }} style={{ height: 20 ,width:60 }} />
                        </View>)}
                        <Button
                            small={true}
                            buttonStyle={{marginTop:10}}
                            color="white"
                            backgroundColor="#2196F3"
                            borderRadius={4}
                            fontSize={20}
                            title="登陆"
                            onPress={() => {this.login.login(this.state.zh,this.state.pwd,this.state.yzm)}}
                        />
                    </KeyboardAvoidingView>
                </View>
                <BusyIndicator style={{zIndex:999}}/>
            </View>

        );
    }
}
