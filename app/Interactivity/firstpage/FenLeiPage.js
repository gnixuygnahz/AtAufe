/**
 * Created by anytime on 2016/12/4.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';
import CloudList from './../../UICom/CloudListRealm';
import AppInitSerice from './../../Service/AppInitService';
import ArticlePage from './../article/ArticlePage';

import AV from 'leancloud-storage';

import ArticleListPage from './ArticleListPage';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class FenLeiPage extends Component {

    constructor () {
        super();
    }


    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    componentDidMount() {
        // const {navigator} = this.props;
        // if (Platform.OS === 'android') {
        //     BackAndroid.addEventListener('hardwareBackPress', function () {
        //
        //         if (navigator) {
        //             navigator.pop();
        //         }
        //         return true;
        //     });
        // }
    }


    render() {
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>分类</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                    </View>
                </View>

                <List>
                    <CloudList
                        pageSize={30}
                        dataLoad={(limit,skip,fun)=>{
                            let query = new AV.Query('ArticleClass');
                            query.limit(limit);
                            query.skip(skip);
                            query.find().then(function (results) {
                                fun(results);
                            }, function (error) {
                            });
                        }}
                        ref='list'
                        onEndReachedThreshold={10}
                        renderRow={(rowData,s,id)=>{
                            let page=this;
                            return (

                                    <ListItem
                                        roundAvatar
                                        title={rowData.get("m_description")}
                                        avatar={{uri:rowData.get("indexImg")}}
                                        key={id}
                                        onPress={()=>{
                                            const { navigator } = page.props;
                                            if(navigator) {
                                                navigator.push({
                                                    name: 'ArticleListPage',
                                                    component: ArticleListPage,
                                                    params: {
                                                        classId: rowData.getObjectId(),
                                                        title:rowData.get("m_description")
                                                    }
                                                });
                                            }
                                        }}
                                    />

                            );
                        }}
                    />
                </List>



            </View>
        );
    }
}