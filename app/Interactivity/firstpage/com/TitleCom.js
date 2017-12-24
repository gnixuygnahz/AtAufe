/**
 * Created by anytime on 2016/12/3.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,Alert,
    TouchableOpacity } from 'react-native';

import ViewPager from 'react-native-viewpager';
import ArticlePage from './../../article/ArticlePage';
import WebPage from './../../web/WebPage';

const yzm="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3890189884,3154658407&fm=58";

var deviceWidth = Dimensions.get('window').width;
var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:deviceWidth/3,
        margin:0
    }
});

//data格式：img  title  sub  height

export default class TitleCom extends Component {

    constructor(props) {
        super(props);
        this.onClick=this.onClick.bind(this);
    }

    onClick(){
        Alert.alert("","");
    }

    render() {
        const { navigator } = this.props;
        return (
            <View style={{width:deviceWidth,height:this.props.data.height,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    <Image source={{uri:yzm}} style={{height:15,width:15,borderRadius:40,marginRight:6}} />
                    <Text style={{fontWeight:"900",fontSize:12}}>每日最新</Text>
                </View>
                <Text style={{color:"#787878",fontSize:10}}>发现被深藏的好文章</Text>
            </View>
        );
    }
}