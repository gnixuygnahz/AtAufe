import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Image,WebView,Clipboard,BackAndroid,Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
var Popover = require('react-native-popover');
let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;
export default class WebPage extends Component {
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


    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
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
                        <Text style={{color: '#60729B',fontSize:16}}></Text></View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 70,paddingRight:10}}>
                        <TouchableOpacity activeOpacity={0.5}  ref='button'  onPress={this.showPopover.bind(this)}>
                            <Icon2 name="more-horiz" size={25} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>

                    </View>
                </View>

                <WebView
                    style={{flex:1}}
                    source={{uri: this.props.id}}
                    mediaPlaybackRequiresUserAction={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />

                <Popover
                    style={{zIndex:999}}
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    placement="bottom"
                    onClose={this.closePopover.bind(this)}>
                    <View style={{width:120,flexDirection:'column',alignItems: 'center'}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            Clipboard.setString(this.props.id);
                            this.showMsg('文章链接已复制到剪贴板~');
                        }} style={{width:120,height:30,flexDirection:'column',justifyContent:'center',alignItems: 'center',borderBottomWidth:1,borderColor:'#EBEBF1'}}>

                            <Text >分享</Text>

                        </TouchableOpacity>
                    </View>
                </Popover>

            </View>
        );
    }
}