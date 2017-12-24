import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl,Dimensions,StatusBar,Alert
} from 'react-native';
import ArticlePage from './../article/ArticlePage';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import IconBadge from 'react-native-icon-badge';
import ConvListPage from '../im/ConvListPage';
import SearchPage from '../search/SearchPage';
import { connect } from 'react-redux';
import CloudListFirst from './../../UICom/CloudListFirst';
import AV from 'leancloud-storage';

import LunBoCom from './com/LunBoCom';
import ModuleCom from './com/ModuleCom';
import AdPlayCom from './com/AdPlayCom';
import TitleCom from './com/TitleCom';
import Article3 from './../../UICom/articleShowType/Article3';
import Article4 from './../../UICom/articleShowType/Article4';

const deviceWidth = Dimensions.get('window').width;
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

class FirstPage extends Component {

    constructor(props){
        super(props);
        this.renderRow=this.renderRow.bind(this);
    }

    //组件类型，0，文章，1，轮播图，2，模块格，3，广告位，4，分割栏
    renderRow(item,i){

        switch(item.get('componentType')){
            case 0:
                if(item.get('indexImg')){
                    return (<Article3 key={item.id} data={item} navigator={this.props.navigator} />);
                }else{
                    return (<Article4 key={item.id} data={item} navigator={this.props.navigator} />);
                }
            case 1:
                return (<LunBoCom key={item.id} data={item.get('componentData')} navigator={this.props.navigator} />);
            case 2:
                return (<ModuleCom key={item.id} data={item.get('componentData')} navigator={this.props.navigator} />);
            case 3:
                return (<AdPlayCom key={item.id} data={item.get('componentData')} navigator={this.props.navigator} />);
            case 4:
                return (<TitleCom key={item.id} data={item.get('componentData')} navigator={this.props.navigator} />);
        }


    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={[AppStyle.container]}>
                <StatusBar
                    translucent={true}
                    backgroundColor="#00000000"
                    barStyle="light-content"
                />
                <View style={[AppStyle.toolbar]}>

                    <TouchableOpacity style={[AppStyle.searchbar]}
                                      onPress={()=>{
                                          const { navigator } = this.props;
                                          if(navigator) {
                                              navigator.push({
                                                  name: 'SearchPage',
                                                  component: SearchPage
                                              });
                                          }
                                      }}
                    >

                        <Icon2 name="search" size={20} color={AppColor.searchIcon}/>

                        <Text style={[AppStyle.searchbarText]}>搜索问答、文章、话题或用户</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{padding:10}} activeOpacity={0.5} onPress={()=>{
                        const { navigator } = this.props;
                        if(navigator) {
                            navigator.push({
                                name: 'ConvListPage',
                                component: ConvListPage
                            });
                        }
                    }}>
                        {this.props.unReadNum==0?(<Icon2 name="notifications" size={25} color={AppColor.toolbalIcon}/>):(<IconBadge
                            MainElement={
                                <Icon2 name="notifications" size={25} color={AppColor.toolbalIcon}/>
                            }
                            BadgeElement={
                                <Text style={{color:'#FFFFFF'}}>{this.props.unReadNum}</Text>
                            }
                            IconBadgeStyle={
                            {
                                top:-3,
                                right:-5,
                                width:15,
                                height:15,
                                backgroundColor: 'red'}
                            }
                        />)}

                    </TouchableOpacity>
                </View>

                <CloudListFirst
                    style={{flex:1}}
                    pageSize={20}
                    dataLoad={(limit,skip,fun)=>{
                        let query = new AV.Query('Articles');
                        query.limit(limit);
                        query.skip(skip);
                        query.addDescending('xid');
                        query.find().then(function (results) {
                            fun(results);
                            }, function (error) {
                        });
                    }}
                    ref='list'
                    onEndReachedThreshold={10}
                    renderRow={(rowData,s,id)=>{
                        return this.renderRow(rowData,s);
                    }}
                />
                </View>
        );
    }
}

function select(store) {
    return {
        conversation: store.messageStore.conversation,
        unReadNum: store.messageStore.unReadNum,
    }
}

export default connect(select)(FirstPage);
