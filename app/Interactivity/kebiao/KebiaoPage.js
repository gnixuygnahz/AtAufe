import React, { Component } from 'react';
import { Text, View ,Dimensions,PixelRatio,TouchableOpacity,ScrollView } from 'react-native';
import KebiaoCon from './KebiaoCon';
import Popup from 'react-native-popup';
const fenge=1;
const width = Dimensions.get('window').width;
const courseWidth = (width / 7); // 每门课宽度
const courseHeight = 50; // 每门课高度
const devidetop=courseHeight-0.4;
const colors=['#E8E8E8','#98D262','#E395B4','#8DAAE1','#EF9EA0','#75B7A0'];

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class KebiaoPage extends Component {

    constructor(props) {
        //console.log('constructor');
        super(props);
        this.state={
            courses:[]
        };
        this.renderCourse=this.renderCourse.bind(this);
    }

    componentDidMount() {

        if(this.kebiaoCon==null||this.kebiaoCon==undefined){

            this.kebiaoCon = new KebiaoCon(this);
            this.kebiaoCon.init(); // 初始化事件

        }

    }

    renderCourse(item,i){

        const right=(item.xingQi-1)*courseWidth+fenge;
        const top=(item.jieCi-1)*courseHeight+fenge;
        const courseHeight1=(item.jieShu)*courseHeight-2*fenge;
        const courseWidth1=courseWidth-2*fenge;
        const colorId= Math.ceil(Math.random()*5);
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                this.popup.tip({
                    title: item.keChengMing,
            content: item.jiaoXueLou+item.jiaoShi,
        });
            }} style={{position:'absolute',margin:0,width:courseWidth1,height:courseHeight1,top:top,left:right,backgroundColor:colors[colorId],padding:4,borderRadius:4,overflow:'hidden'}} key={i}  detail={item}>
                <Text style={{color:'#FFFFFF',overflow:'hidden'}}>{item.keChengMing}@{item.jiaoXueLou}{item.jiaoShi}</Text>
            </TouchableOpacity>
        );
    }

    setCourses(courses){

        this.setState({courses:courses});
    }

    render() {

        return (
            <View style={[AppStyle.container]}>
                <View style={[AppStyle.toolbar]}>
                    <View style={{width: 70}}></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={[AppStyle.toolbarTitle]}>课表</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>

                    </View>
                </View>
                <View style={{flexDirection: 'row',height:30,backgroundColor: '#FFFFFF', borderBottomWidth: 0.4,
                    borderColor: '#ADADAD'}}>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周一</Text></View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周二</Text></View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周三</Text></View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周四</Text></View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周五</Text></View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周六</Text></View>
                    <View style={{flex:1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}><Text style={{color:'#60729B',fontWeight:'bold'}}>周日</Text></View>
                </View>
                <ScrollView style={{flex:1,backgroundColor:'#EBEBF1'}}>
                    <View style={{height:courseHeight*13}}>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.8,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                        <View style={{flex:1,height:0.4,backgroundColor:'#BDBDC3',marginTop:devidetop}}></View>
                    </View>
                    {this.state.courses.map((item,i)=>{return this.renderCourse(item,i)})}

                </ScrollView>
                <Popup ref={popup => this.popup = popup }/>
            </View>
        );
    }
}
