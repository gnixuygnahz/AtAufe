import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity} from 'react-native';
import CloudList from './../../UICom/CloudListRealm';
import AV from 'leancloud-storage';
import AppInitSerice from './../../Service/AppInitService';
import {List, ListItem} from 'react-native-elements';
import OthersPage from './../others/OthersPage';
var Swipeout = require('react-native-swipeout');
export default class FollowPeoplePage extends Component {

    constructor () {
        super();
        this.state = {
            selectedIndex: 0
        };
        this.updateIndex = this.updateIndex.bind(this);
    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        const buttons = ['关注的人', '关注的帖子','收藏'];
        const { selectedIndex } = this.state;
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
                        let res = realm.objects('Followee').slice(skip,limit);
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

                                    AV.User.current().unfollow(rowData.id).then(function(){


                                        let realm = AppInitSerice.getRealm();
                                        let hondas = realm.objects('Followee').filtered('id = "'+rowData.id+'"');
                                        if(hondas.length>0){
                                            console.log(hondas);
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
                                roundAvatar
                                title={rowData.petName}
                                avatar={{uri:rowData.headimg}}
                                onPress={()=>{
                                    if (this.props.navigator) {
                                        this.props.navigator.push({
                                            name: 'OthersPage',
                                            component: OthersPage,
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