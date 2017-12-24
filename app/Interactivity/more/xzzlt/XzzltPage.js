/**
 * Created by anytime on 16/11/16.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CloudList from './../../../UICom/CloudList';
import AV from 'leancloud-storage';
import AppInitSerice from './../../../Service/AppInitService';
import {List, ListItem} from 'react-native-elements';



export default class XzzltPage extends Component {

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
                                        text: 'Button',
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
                                                        id: fromUser.get('objectId')
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