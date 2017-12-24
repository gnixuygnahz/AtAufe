import React, { Component } from 'react';
import { View ,Text,Image} from 'react-native';
import CloudList from './../../UICom/CloudList';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AV from 'leancloud-storage';

export default class HotPage extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <View>
                <CloudList
                    pageSize={15}
                    dataLoad={(limit,skip,fun)=>{
                        let query = new AV.Query('Articles');
                        query.select('objectId', 'readNum', 'digest', 'title', 'likeNum', 'author', 'reprintSource', 'articleShowType', 'sourceType', 'reprintImg', 'indexImg', 'commentNum', 'onTop', 'keyWords', 'createdAt');
                        var targetTag = AV.Object.createWithoutData('ArticleClass', '57e3c4978ac247005bb2f642');
                        query.equalTo('articleClass', targetTag);
                        let query1 = new AV.Query('Articles');
                        query1.select('objectId', 'readNum', 'digest', 'title', 'likeNum', 'author', 'reprintSource', 'articleShowType', 'sourceType', 'reprintImg', 'indexImg', 'commentNum', 'onTop', 'keyWords', 'createdAt');
                        var targetTag2 = AV.Object.createWithoutData('ArticleClass', '57e3c4348ac247005bb2f2bc');
                        query1.equalTo('articleClass', targetTag2);

                        var query3 = AV.Query.or(query, query1);
                        query3.limit(limit);
                        query3.skip(skip);
                        query3.descending('commentNum');
                        query3.descending('createdAt');
                        query3.include('author');
                        query3.find().then(function (results) {
                            fun(results);
                        }, function (error) {
                        });
                    }}
                    onEndReachedThreshold={10}
                    renderRow={(rowData)=>{
                        let author = rowData.get('author');
                        return (<View style={{marginTop:10,marginLeft:10,marginRight:10,backgroundColor:'#FFFFFF',flexDirection: 'column',flex:1,borderColor: '#C9C9C9',borderWidth: 0.3,borderRadius:5}}>
                            <View style={{flex:1,borderColor: '#C9C9C9',borderBottomWidth: 0.3,flexDirection: 'row',alignItems: 'center'}}>
                                <Text style={{fontWeight:'bold',margin:10,color:'#62667B',flex:1}} numberOfLines={2}>{rowData.get('title')}
                                </Text>
                                <Icon2 name="navigate-next" size={20} color='#CACAD1'/>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginLeft:10,marginTop:10,marginBottom:10,flexDirection: 'column'}} >
                                    <Image source={{uri:author.get('headimg')}} style={{height:17,width:17,borderRadius: 72}} />
                                    <View style={{backgroundColor:'#5F9DF3',borderRadius:2,flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',marginTop:8}}>
                                        <Text style={{color:'#FFFFFF',fontSize:8,textAlign:'center'}}>{rowData.get('commentNum')}</Text>
                                    </View>

                                </View>
                                <Text style={{margin:10,flex:1,color:'#515151'}} numberOfLines={4}>{rowData.get('digest')}
                                </Text>
                            </View>
                        </View>);
                    }}
                />
            </View>
        );
    }
}