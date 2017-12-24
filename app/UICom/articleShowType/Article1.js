/**
 * Created by anytime on 2016/12/1.
 */

import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,
    TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

//有大图，有头标

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



export default class Article1 extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { navigator } = this.props;
        return (
            <View style={{backgroundColor:'#FFF',flexDirection:'column',marginTop:9,borderColor: '#E3E7F1',borderBottomWidth: 0.3}}>
                <View style={{flexDirection:'row',alignItems: 'center',padding:9}}>
                    <Image source={{uri:author.get('headimg')}} style={{height:17,width:17,borderRadius: 72,marginRight:9}} />
                    <Text style={{fontSize:12,color:'#8C9AB8'}}>{author.get('petName')}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                                    const { navigator } = this.props;
                                    if(navigator) {
                                        navigator.push({
                                            name: 'ArticlePage',
                                            component: ArticlePage,
                                            params: {
                                                id: rowData.getObjectId()
                                            }
                                        });
                                    }
                                }}>
                    <Text style={{color:'#424242',fontWeight:'bold',fontSize:15,marginLeft:9,marginRight:9,marginBottom:3}} >{rowData.get('title')}</Text>
                    <Image style={{height:deviceWidth/2.5}} resizeMode='cover' source={{uri: indexImg}} />
                    <Text style={{color:'#424242',marginLeft:9,marginRight:9,marginBottom:3,marginTop:0,lineHeight:21,}} numberOfLines={3} >{rowData.get('digest')}</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',alignItems: 'center',padding:9,paddingTop:0}}>
                    <Text style={{fontSize:12,color:'#8C9AB8'}}>{rowData.get('likeNum')} 赞同 · {rowData.get('commentNum')} 评论</Text>
                </View>
            </View>
        );
    }
}