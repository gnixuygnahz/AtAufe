import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ListView, RefreshControl,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import CommentCon from './CommentCon';
import UserCommentPage from  './UserCommentPage';
import Toast from 'react-native-root-toast';
import OthersPage from './../others/OthersPage';
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;
export default class CommentPage extends Component {
    constructor(props) {

        super(props);

        this.state = {
            dataSource: new ListView.DataSource(
                {
                    rowHasChanged: (r1, r2) => {
                        return (r1.id !== r2.id || r1.get('likeNum') !== r2.get('likeNum'))
                    }
                }
            ),
            isRefreshing: false
        };
        this._data = [];
        this.page = 0;
        this.pageSize = 15;
        this.load = true;
        this.isLocked = true;
        this.first = true;
    }

    showMsg(msg) {
        // Add a Toast on screen.
        let toast = Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });

        setTimeout(function () {
            Toast.hide(toast);
        }, 1500);
    }

    componentDidMount() {
        this.commentCon = new CommentCon(this);
        this.commentCon.getData();

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

    addNewData(newData) {
        if (this.first) {
            setTimeout(()=> {
                this._data = this._data.concat(newData);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data)
                });
            }, 500);
            this.first = false;
        } else {
            this._data = this._data.concat(newData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this._data)
            });
        }

    }


    addLike(i, num) {

        this._data = ([]).concat(this._data);
        let time = this._data[i].getCreatedAt();
        let object = this._data[i].getObjectId();
        this._data[i] = this._data[i].clone(); // 此次需要深复制对象
        this._data[i].set('createdAt', time);
        this._data[i].set('objectId', object);
        this._data[i].set('likeNum', this._data[i].get('likeNum') + num);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data)
        });
    }


    loadNew() {
        if (!this.isLocked) {
            this.commentCon.getData();
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this._refreshData();
        this.commentCon.getData(true);
    }

    finishRefresh() {
        this.setState({isRefreshing: false});
    }

    _refreshData() {
        this._data = [];
        this.setState({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}),
        });
        this.page = 0;
        this.pageSize = 15;
        this.load = true;
        this.isLocked = true;
    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    jumpToUserComment() {
        if (this.props.navigator) {
            this.props.navigator.push({
                name: 'UserCommentPage',
                component: UserCommentPage,
                params: {
                    id: this.props.id
                }
            });
        }
    }

    render() {
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}><TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}><Icon2
                        name="navigate-before" size={30} color={AppColor.toolbalIcon}/></TouchableOpacity></View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}><Text style={AppStyle.toolbarTitle}>评论</Text></View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 70, paddingRight: 10}}>
                        <Icon2 name="format-line-spacing" size={25} color="#60729B" style={{paddingRight: 10}}/>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.jumpToUserComment.bind(this)}><Icon2
                            name="add" size={25} color={AppColor.toolbalIcon}/></TouchableOpacity>
                    </View>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this.loadNew.bind(this)}
                    refreshControl={

                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=> {
                                this._onRefresh();
                            }}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />

                    }
                    onEndReachedThreshold={10}
                    renderRow={(rowData, i, id) => {
                        const fromUser = rowData.get('fromUserObj');
                        let to='';
                        if(rowData.get('toCommentObj')){
                            to="    回复  "+rowData.get('toCommentObj').get('fromUserObj').get('petName');
                        }
                        return (
                            <View style={{flexDirection: 'row', padding: 10, paddingBottom: 0}}>
                                <TouchableOpacity activeOpacity={0.5} style={{marginRight: 10}} onPress={()=>{
                                    if (this.props.navigator) {
                                        this.props.navigator.push({
                                            name: 'OthersPage',
                                            component: OthersPage,
                                            params: {
                                                id: fromUser.get('objectId')
                                            }
                                        });
                                    }
                                }
                                }
                                ><Image source={{uri: fromUser.get('headimg')}}
                                       style={{width: 35, height: 35, borderRadius: 40}}/>
                                    </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'column',
                                    borderBottomWidth: 0.3,
                                    flex: 1,
                                    paddingBottom: 10,
                                    borderColor: '#E2E1E1'
                                }}>
                                    <Text
                                        style={{color: '#696969', fontWeight: 'bold'}}>{fromUser.get('petName')}{to}</Text>
                                    <Text style={{color: '#696969'}}>{rowData.get('content')}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity activeOpacity={0.5} style={{flexDirection: 'row'}} onPress={()=> {
                                            this.commentCon.like(id, rowData.get('objectId'));
                                        }}>
                                            <Icon2 name="thumb-up" size={10} color="#8C9AB8"/>
                                            <Text style={{
                                                marginLeft: 5,
                                                fontSize: 10,
                                                color: '#8C9AB8'
                                            }}>赞 {rowData.get('likeNum')} · </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.5} onPress={()=> {
                                            if (this.props.navigator) {
                                                this.props.navigator.push({
                                                    name: 'UserCommentPage',
                                                    component: UserCommentPage,
                                                    params: {
                                                        id: this.props.id,
                                                        toCommentObjId: rowData.get('objectId'),
                                                        petName: fromUser.get('petName')
                                                    }
                                                });
                                            }
                                        }}>
                                        <Text style={{fontSize: 10, color: '#8C9AB8'}}>回复</Text>
                                            </TouchableOpacity>
                                        <Text  style={{fontSize: 10, color: '#8C9AB8'}}> · </Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: '#8C9AB8'
                                        }}>{rowData.get('createdAt').getMonth()}/{rowData.get('createdAt').getDay()}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}
