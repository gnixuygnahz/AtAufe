/**
 * Created by anytime on 2016/12/2.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,
    TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

//有右图，无头标




export default class Article2 extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { navigator } = this.props;
        return (

            <View style={{backgroundColor:'#FFF',flexDirection:'row'}}>

                <View style={{backgroundColor:'#FFF',flexDirection:'column',flex:1}}>
                    <Text numberOfLines={2} style={{color:'#424242',fontWeight:'bold',fontSize:15,marginLeft:9,marginRight:9,marginBottom:9,marginTop:3,lineHeight:25}} >{this.props.data.get("title")}</Text>
                    <Text numberOfLines={2} style={{color:'#BEBEBE',fontSize:11,marginLeft:9,}} >底部</Text>
                </View>

                <Image source={{uri:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3890189884,3154658407&fm=58"}} style={{height:70,width:90,margin:10,marginRight:13}} />

            </View>

        );
    }
}