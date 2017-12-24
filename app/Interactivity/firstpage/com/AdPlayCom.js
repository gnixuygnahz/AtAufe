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

var deviceWidth = Dimensions.get('window').width;
var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:deviceWidth/3,
        margin:0
    }
});

//data格式：img  data  height type

export default class AdPlayCom extends Component {

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
            <TouchableOpacity style={{width:deviceWidth,height:this.props.data.height}} activeOpacity={1} onPress={()=>{this.onClick()}}>
            <Image
                source={{uri: this.props.data.img}}
                style={{width:deviceWidth,height:this.props.data.height}} />
            </TouchableOpacity>
        );
    }
}