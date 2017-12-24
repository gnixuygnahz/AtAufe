import React, { Component } from 'react';
import { StyleSheet, View, Animated,Dimensions,WebView,Platform,Text } from 'react-native';
import AppInitSerice from './../../Service/AppInitService';
import AV from 'leancloud-storage';
import Load from "react-native-loading-gif";
import NotificationService from './../../Service/NotificationService';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
const deviceHeight = Dimensions.get('window').height-70;
var WebViewAndroid = require('react-native-webview-android');

var styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        height:deviceHeight
    },
    viewpager: {
        flex: 1,
    },
});



export default class CommunityPage extends Component {

    constructor(props){
        super(props);
        let realm = AppInitSerice.getRealm();
        let url= realm.objects('Config').filtered('name = "bbs"')[0];
        this.state={
            url:url.value,
            isLoad: false,
            token: '',
            loading: true,
            myurl:url.value,
        };
        this.loadnum=2;
        this.loadnum2=0;
        this.goBack=this.goBack.bind(this);
        this.canGoBack=false;
    }

    componentDidMount() {
        let page=this;
        this.refs.Load.OpenLoad();

            if(AV.User.current()){
                fetch('https://a.0i0.bid/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'username='+AV.User.current().getUsername()+ '&password='+AV.User.current().get('pwd')+'00'
                }).then((responsejson) => responsejson.json()).then((response) => {
                    //console.log(response);
                    page.setState({
                        token:response.token,
                        isLoad:true
                    });
                })
                    .catch((error) => {
                        failed('网络错误');
                        console.error(error);
                    });
            }



    }

    goBack(){
        this.refs.webViewAndroidSample.goBack();
    }



    onNavigationStateChange(event) {

        console.log(event);
        if(!event.loading){
            let realm = AppInitSerice.getRealm();
            let url= realm.objects('Config').filtered('name = "bbs"')[0];
            if(event.url!=url.value){

            }

            this.setState({myurl:event.url});
            this.loadnum2++;
            if(this.loadnum2==1){
                this.setState({url:"https://bbs.0i0.bid/"});
            }
            if(this.loadnum2==2){
                this.refs.Load.CloseLoad();
            }
        }
        this.canGoBack=event.canGoBack;
    }



    render() {
        const script='document.cookie="flarum_remember='+this.state.token+'";';

                return (

                    <View style={{flex:1,backgroundColor:'#FFF',paddingTop:10}}>
                        <WebViewAndroid
                            ref="webViewAndroidSample"
                            injectedJavaScript={script}
                            style={{flex:1}}
                            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                            source={{uri: this.state.url}}
                            mediaPlaybackRequiresUserAction={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            startInLoadingState={true}
                            scalesPageToFit={true}
                        />
                        <Load ref="Load" opacity={1} bgColor="#FFF" Image={4}></Load>
                    </View>

                );




    }

}

