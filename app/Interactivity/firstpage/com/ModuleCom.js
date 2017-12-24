/**
 * Created by anytime on 2016/11/30.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,
    TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

import FenLeiPage from './../FenLeiPage';

//3种类型，1，某分类文章，2，网页，3，文章分类（更多分类）
//数据字段: type  data  img  title

var styles = StyleSheet.create({
    gird:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:12,
    },
    text:{
        marginTop:4,
        fontSize:10
    }
});



export default class ModuleCom extends Component {

    constructor(props) {
        super(props);
        this.renderCol=this.renderCol.bind(this);
        this.renderRow=this.renderRow.bind(this);
        this.onClick=this.onClick.bind(this);
    }

    onClick(item){
        switch (item.type){
            case 3:
                this.props.navigator.push({
                    name: 'FenLeiPage',
                    component: FenLeiPage
                });
        }
    }

    renderCol(item,i){
        return (<Col sm={1} md={4} lg={3}>
            <TouchableOpacity style={styles.gird}
                              activeOpacity={1} onPress={()=>{this.onClick(item)}}>
                <Image source={{uri:item.img}} style={{height:38,width:38,borderRadius:40}} />
                <Text style={styles.text}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        </Col>);
    }

    renderRow(item,i){
        return (
        <Row size={5}>
            {item.map((it,i)=>{return this.renderCol(it,i)})}
        </Row>
        );
    }

    render() {
        const { navigator } = this.props;
        return (
            <View style={{flex:1,backgroundColor:"#FFF",paddingTop:10,paddingLeft:10,paddingRight:10}}>
            {this.props.data.dataSource.map((item,i)=>{return this.renderRow(item,i)})}
            </View>
        );
    }
}