import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Image,WebView,Clipboard,BackAndroid,Platform} from 'react-native';
import AV from 'leancloud-storage';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ArticleCon from './ArticleCon';
import CommentPage from './CommentPage';
import Toast from 'react-native-root-toast';
import OthersPage from './../others/OthersPage';
import AppInitSerice from './../../Service/AppInitService';
var Popover = require('react-native-popover');
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;
export default class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            url:'',
            likeNum:0,
            commentNum:0,
            title:'',
            isVisible: false,
            buttonRect: {},
            authorId: '',

        };
    }

    setAuthorId(id){
        this.setState({authorId: id});
    }

    componentWillMount() {

    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    showMsg(msg){
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

        let realm = AppInitSerice.getRealm();
        let configs = realm.objects('Config');
        let readHtml = configs.filtered('name = "readHtml"');

        this.setState({
            url: readHtml[0].value+'?id='+this.props.id
        });
        this.article = new ArticleCon(this);
        this.article.init();

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

    setLikeNum(num){
        this.setState({
            likeNum:num
        });
    }

    addLike(num){
        this.setState({
            likeNum:this.state.likeNum+num
        });
    }

    setCommentNum(num){
        this.setState({
            commentNum:num
        });
    }

    setTitle(str){
        this.setState({
            title:str
        });
    }

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    jumpToComment(){
        if (this.props.navigator) {
            this.props.navigator.push({
                name: 'CommentPage',
                component: CommentPage,
                params: {
                    id: this.props.id
                }
            });
        }
    }

    like(){
        this.article.like();
    }

    render() {
        let page=this;
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 70}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>{this.state.title}</Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5}  ref='button'  onPress={this.showPopover.bind(this)}>
                        <Icon2 name="more-horiz" size={25} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>

                    </View>
                </View>

                <WebView
                    style={{flex:1}}
                    source={{uri: this.state.url}}
                    mediaPlaybackRequiresUserAction={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />

                <View style={{borderColor:'#E2E2E2',backgroundColor:'#FFFFFF',borderTopWidth:0.5,height:45,flexDirection: 'row',alignItems: 'center'}}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',flex:1}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.like.bind(this)} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',flex:1}}>
                        <Icon2 name="thumb-up" size={20} color="#60729B"/><Text style={{marginLeft:5,fontSize:10}}>赞 ({this.state.likeNum}) </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',flex:1}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.jumpToComment.bind(this)} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',flex:1}}>
                        <Icon2 name="insert-comment" size={20} color="#60729B"/><Text style={{marginLeft:5,fontSize:10}}>评 ({this.state.commentNum}) </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Popover
                    style={{zIndex:999}}
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    placement="bottom"
                    onClose={this.closePopover.bind(this)}>
                    <View style={{width:120,flexDirection:'column',alignItems: 'center'}}>
                        <TouchableOpacity  activeOpacity={0.5} onPress={()=>{
                            let realm = AppInitSerice.getRealm();

                            var article = AV.Object.createWithoutData('Articles', page.props.id);

                            var relation = AV.User.current().relation('collection').add(article);

                            AV.User.current().save().then(function(){

                                if(realm.objects('Collection').filtered('id = "'+page.props.id+'"').length==0){
                                    realm.write(() => {
                                        realm.create('Collection', {
                                            id: page.props.id,
                                            title: page.state.title,
                                            headimg: ''
                                        });
                                    });
                                }

                                page.showMsg('已收藏~ ');
                            }, function(err){


                            });


                        }} style={{width:120,height:30,borderBottomWidth:1,borderColor:'#EBEBF1',flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>

                            <Text >收藏</Text>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            let realm = AppInitSerice.getRealm();
                            let configs = realm.objects('Config');
                            let readHtml = configs.filtered('name = "readHtml"');
                            Clipboard.setString(readHtml[0].value+'?id='+this.props.id);
                            this.showMsg('文章链接已复制到剪贴板~');
                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center',borderBottomWidth:1,borderColor:'#EBEBF1'}}>

                            <Text >分享</Text>

                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={0.5} onPress={()=>{
                            if (this.props.navigator) {
                                this.props.navigator.push({
                                    name: 'OthersPage',
                                    component: OthersPage,
                                    params: {
                                        id: this.state.authorId
                                    }
                                });
                            }
                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center'}}>
                        <Text >作者</Text>
                    </TouchableOpacity>
                    </View>
                </Popover>
            </View>
        );
    }
}
