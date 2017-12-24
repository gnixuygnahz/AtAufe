import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';
import CloudList from './../../UICom/CloudListRealm';
import AppInitSerice from './../../Service/AppInitService';
import ArticlePage from './../article/ArticlePage';
var Swipeout = require('react-native-swipeout');

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class HistoryPage extends Component {

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
                        <Text style={AppStyle.toolbarTitle}>浏览记录</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            this.refs.list.deleteAll();
                            let realm = AppInitSerice.getRealm();
                            realm.write(() => {
                                realm.delete(realm.objects('History'));
                            });
                        }}>
                        <Text style={AppStyle.toolbarTitle}>清空</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <List>
                    <CloudList
                        pageSize={30}
                        dataLoad={(limit,skip,fun)=>{
                            let realm = AppInitSerice.getRealm();
                            let res = realm.objects('History').slice(skip,limit);
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

                                        page.refs.list.deleteData(id);

                                        let realm = AppInitSerice.getRealm();
                                        let hondas = realm.objects('History').filtered('id = "'+rowData.id+'"');
                                        if(hondas.length>0){

                                            realm.write(() => {
                                                realm.delete(hondas);
                                                });
                                            }


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
                                                        id: rowData.id,
                                                        isHistory: true
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