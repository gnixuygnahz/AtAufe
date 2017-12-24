import React, { Component } from 'react';
import { View,Text,TouchableOpacity,TextInput,Platform } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import CloudList from './../../UICom/CloudListSearch';
import {List, ListItem,ButtonGroup} from 'react-native-elements';
import OthersPage from './../others/OthersPage';
import ArticlePage from './../article/ArticlePage';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;
export default class RecentPage extends Component{

    constructor(props){
        super(props);
        this.state={
            search:'',
            type:'Articles',
            selectedIndex: 0
        };
        this.updateIndex = this.updateIndex.bind(this);

    }
    updateIndex (selectedIndex) {
        this.refs.list.reset(this.state.type,this.state.search);
        if(selectedIndex==0){
            this.setState({selectedIndex,type:'Articles'})
        }else{
            this.setState({selectedIndex,type:'_User'})
        }
    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }



    shouldComponentUpdate(nextProps,nextState){
        if(this.state.search!=nextState.search||this.state.type!=nextState.type||this.state.selectedIndex!=nextState.selectedIndex){




            return true;
        }


            return false;
    }

    render(){
        const buttons = ['文章', '用户'];
        const { selectedIndex,search,type } = this.state;
        let query= this.query;
        let page=this;
        return (
            <View style={AppStyle.container}>
                <BusyIndicator style={{zIndex:10}} />

                <View style={AppStyle.toolbar}>
                    <TouchableOpacity activeOpacity={0.5} style={{width: 40,flexDirection: 'row', justifyContent: 'center',marginLeft:7}} onPress={this.pressBack.bind(this)}>
                        <Text style={AppStyle.toolbarTitle}>取消</Text>
                    </TouchableOpacity>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',marginRight:15}}>
                        <View style={{backgroundColor:'#FFF',flex:1,height:30,borderRadius:4,margin:10,marginRight:0,flexDirection:'row',alignItems: 'center',justifyContent: 'center',paddingLeft:0,paddingRight:5}}>

                            <TextInput style={{marginLeft:5,fontSize:13,flex:1,color:'#60729B',height:(Platform.OS=="android"?40:30)}} placeholder="搜索问答、文章、话题或用户" clearButtonMode="unless-editing" underlineColorAndroid="transparent" value={page.state.search} onChangeText={(text) => { page.setState({ search: text });}}/>
                            <TouchableOpacity activeOpacity={0.5}  onPress={()=>{
                                page.refs.list.reset(page.state.type,page.state.search);
                            }}><Icon2 name="search" size={20} color={AppColor.searchIcon}/></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{
                    height: 43, backgroundColor: '#FFFFFF', borderBottomWidth: 0.4,
                    borderColor: '#ADADAD', flexDirection: 'row', alignItems: 'flex-start',justifyContent:'center'
                }}>
                    <ButtonGroup
                        containerStyle={{height:27,flex:1}}
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons} />

                </View>
               <List
                   containerStyle={{borderWidth:0,marginTop:0}}
               >
                <CloudList
                    pageSize={30}
                    ref='list'
                    onEndReachedThreshold={10}
                    renderRow={(rowData,s,id)=>{
                        if(page.state.type==='Articles'){
                            return (<View style={{backgroundColor:'#FFF',flexDirection:'column',borderColor: '#E3E7F1',borderBottomWidth: 0.3}}>
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
                                    <Text style={{color:'#424242',fontWeight:'bold',fontSize:15,marginLeft:9,marginRight:9,marginBottom:3,marginTop:9}} >{rowData.get('title')}</Text>
                                    <Text style={{color:'#424242',marginLeft:9,marginRight:9,marginBottom:3,marginTop:0,lineHeight:21,}} numberOfLines={3} >{rowData.get('digest')}</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row',alignItems: 'center',padding:9,paddingTop:0}}>
                                    <Text style={{fontSize:12,color:'#8C9AB8'}}>{rowData.get('likeNum')} 赞同 · {rowData.get('commentNum')} 评论</Text>
                                </View>
                            </View>);
                        }else{
                            return (<ListItem
                                roundAvatar
                                onPress={()=>{
                                    if (this.props.navigator) {
                                        this.props.navigator.push({
                                            name: 'OthersPage',
                                            component: OthersPage,
                                            params: {
                                                id: rowData.getObjectId()
                                            }
                                        });
                                    }
                                }}
                                avatar={{uri:rowData.get('headimg')}}
                                key={id}
                                title={rowData.get('petName')}
                                subtitle={rowData.get('signature')}
                            />);
                        }
                    }}
                />
                   </List>
            </View>
        );
    }
}



