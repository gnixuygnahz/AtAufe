/**
 * Created by anytime on 2016/12/2.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,
    TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

//无图，有头标

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

                <View style={{backgroundColor:'#FFF',flexDirection:'column',marginTop:9,borderColor: '#E3E7F1',borderBottomWidth: 0.3}}>
                    <View style={{flexDirection:'row',alignItems: 'center',padding:9}}>
                        <Image source={{uri:"http://o90qf0lw6.bkt.clouddn.com/headmoren.jpg"}} style={{height:17,width:17,borderRadius: 72,marginRight:9}} />
                        <Text style={{fontSize:12,color:'#8C9AB8'}}>asdsadasd</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{

                                }}>
                        <Text style={{color:'#424242',fontWeight:'bold',fontSize:15,marginLeft:9,marginRight:9,marginBottom:3}} >asdsadsad</Text>

                        <Text style={{color:'#424242',marginLeft:9,marginRight:9,marginBottom:3,marginTop:0,lineHeight:21,}} numberOfLines={3} >sadsadsadasd</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',alignItems: 'center',padding:9,paddingTop:0}}>
                        <Text style={{fontSize:12,color:'#8C9AB8'}}>11 赞同 · 11 评论</Text>
                    </View>
                </View>

        );
    }
}