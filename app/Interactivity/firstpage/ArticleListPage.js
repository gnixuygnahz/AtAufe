/**
 * Created by anytime on 2016/12/4.
 */
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

import Article1 from './../../UICom/articleShowType/Article1';
import Article2 from './../../UICom/articleShowType/Article2';
import Article3 from './../../UICom/articleShowType/Article3';
import Article4 from './../../UICom/articleShowType/Article4';

const deviceWidth = Dimensions.get('window').width;
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

// classId

export default class ArticleListPage extends Component {

    constructor(props){
        super(props);
        this.renderRow=this.renderRow.bind(this);
    }

    //组件类型，0，文章，1，轮播图，2，模块格，3，广告位，4，分割栏
    renderRow(item,i){

        switch(item.get("articleShowType")){
            case 1:
                return (<Article1 key={item.id}  data={item} navigator={this.props.navigator} />);
            case 2:
                return (<Article2 key={item.id}  data={item} navigator={this.props.navigator} />);
            case 3:
                return (<Article3 key={item.id} data={item}  navigator={this.props.navigator} />);
            case 4:
                return (<Article4 key={item.id}  data={item} navigator={this.props.navigator} />);
            default:
                return (<Article4 key={item.id}  data={item} navigator={this.props.navigator} />);
        }


    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={[AppStyle.container]}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>{this.props.title}</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                    </View>
                </View>

                <CloudListFirst
                    style={{flex:1}}
                    pageSize={20}
                    dataLoad={(limit,skip,fun)=>{
                        let query = new AV.Query('Articles');
                        query.limit(limit);
                        query.skip(skip);
                        query.addDescending('xid');
                        let articleClass = AV.Object.createWithoutData('ArticleClass', this.props.classId);
                        query.equalTo('articleClass', articleClass);
                        query.find().then(function (results) {
                            fun(results);
                        }, function (error) {
                        });
                    }}
                    ref='list'
                    onEndReachedThreshold={10}
                    renderRow={(rowData,s,id)=>{

                        return (
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
                            {this.renderRow(rowData,s)}
                            </TouchableOpacity>
                            );
                    }}
                />
            </View>
        );
    }
}

