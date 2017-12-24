import React, { Component } from 'react';
import { View ,Text,Image} from 'react-native';
import CloudList from './../../UICom/CloudList';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AV from 'leancloud-storage';

export default class ThemePage extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <View>
                <CloudList
                    pageSize={15}
                    dataLoad={(limit,skip,fun)=>{
                        let query = new AV.Query('ArticleClass');
                        query.limit(limit);
                        query.skip(skip);
                        query.descending('createdAt');
                        query.select('objectId', 'm_description', 'name','indexImg','attentionNum', 'createdAt');
                        query.find().then(function (results) {
                            fun(results);
                        }, function (error) {
                        });
                    }}
                    onEndReachedThreshold={10}
                    renderRow={(rowData)=>{

                        return (
                            <View style={{marginTop:10,marginLeft:10,marginRight:10,backgroundColor:'#FFFFFF',flexDirection: 'column',flex:1,borderColor: '#C9C9C9',borderWidth: 0.3,borderRadius:5}}>
                            <View style={{flex:1,borderColor: '#C9C9C9',borderBottomWidth: 0.3,flexDirection: 'row',alignItems: 'center'}}>
                                <Image source={{uri:rowData.get('indexImg')}} style={{height:40,width:40,margin:10,borderRadius: 72}} />
                                <View style={{flexDirection: 'column',flex:1,height:40,justifyContent: 'center'}}>
                                    <Text style={{fontSize:13,fontWeight:'bold',color:'#62667B',marginBottom:3}} >{rowData.get('m_description')}</Text>
                                    <Text style={{fontSize:10}}>{rowData.get('attentionNum')} 人关注</Text>
                                </View>

                                <Icon2 name="navigate-next" size={20} color='#CACAD1'/>
                            </View>
                        </View>);
                    }}
                />
            </View>
        );
    }
}