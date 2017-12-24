import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity} from 'react-native';
import CloudList from './../../UICom/CloudListRealm';
import AV from 'leancloud-storage';
import AppInitSerice from './../../Service/AppInitService';
import {List, ListItem} from 'react-native-elements';
import ArticlePage from './../article/ArticlePage';

var Swipeout = require('react-native-swipeout');

export default class FollowCollectionPage extends Component {

    constructor () {
        super();


    }


    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        var swipeoutBtns = [
            {
                text: 'Button',
                backgroundColor: '#FF5151'
            }
        ];
        return (
            <View style={{backgroundColor: '#EBEBF1', flex: 1,flexDirection: 'column'}}>
                <List>
                    <CloudList
                        pageSize={30}
                        dataLoad={(limit,skip,fun)=>{
                            let realm = AppInitSerice.getRealm();
                            let res = realm.objects('Collection').slice(skip,limit);
                            fun(res);
                        }}
                        ref='list'
                        onEndReachedThreshold={10}
                        renderRow={(rowData,s,id)=>{
                            let page=this;
                            return (
                                <Swipeout
                                    autoClose={true}
                                    right={[{
                                    text: '删除',
                                    backgroundColor: '#FF5151',
                                    onPress: function () {

                                        var article = AV.Object.createWithoutData('Articles', rowData.id);

                                        var relation = AV.User.current().relation('collection').remove(article);

                                        AV.User.current().save().then(function(){


                                            let realm = AppInitSerice.getRealm();
                                            let hondas = realm.objects('Collection').filtered('id = "'+rowData.id+'"');
                                            if(hondas.length>0){

                                                realm.write(() => {
                                                    realm.delete(hondas);
                                                });
                                            }
                                            page.refs.list.deleteData(id);

                                        }, function(err){

                                            console.dir(err);
                                        });


                                    }
                                }]}>
                                    <ListItem
                                        title={rowData.title}
                                        onPress={()=>{
                                            if (this.props.navigator) {
                                                this.props.navigator.push({
                                                    name: 'ArticlePage',
                                                    component: ArticlePage,
                                                    params: {
                                                        id: rowData.id
                                                    }
                                                });
                                            }
                                        }}
                                    />
                                </Swipeout>
                            );
                        }}
                    />
                </List>
            </View>
        );
    }
}