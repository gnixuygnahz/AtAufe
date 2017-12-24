/**
 * Created by anytime on 2016/12/2.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,
    TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

//无图，无头标

var styles = StyleSheet.create({
    gird:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:0.2,
        borderBottomWidth:0.2,
        borderColor:'#EBEBEB',
        paddingTop:12,
        paddingBottom:12,
    },
    text:{
        marginTop:7,
        fontSize:10
    }
});



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
                        <Text numberOfLines={2} style={{color:'#BEBEBE',fontSize:11,marginLeft:9,marginBottom:9}} >标题</Text>
                    </View>

                </View>


        );
    }
}