import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity,Platform,BackAndroid} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {ButtonGroup} from 'react-native-elements';

import FollowPeoplePage from './FollowPeoplePage';
import FollowCollectionPage from './FollowCollectionPage';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class FollowPage extends Component {

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

    pressBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    renderPage(){
        switch (this.state.selectedIndex){
            case 0:
                return (<FollowPeoplePage navigator={this.props.navigator} />);
                break;
            case 1:
                return (<FollowCollectionPage  navigator={this.props.navigator} />);
                break;
            case 2:
                return (<FollowCollectionPage  navigator={this.props.navigator} />);
                break;
        }
    }

    render() {
        const buttons = ['关注的人','收藏'];
        const { selectedIndex } = this.state;
        return (
            <View style={AppStyle.container}>
                <View style={AppStyle.toolbar}>
                    <View style={{width: 40}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.pressBack.bind(this)}>
                            <Icon2 name="navigate-before" size={30} color={AppColor.toolbalIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={AppStyle.toolbarTitle}>我关注的</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'flex-end', width: 40,paddingRight:10}}>
                    </View>
                </View>

                <View style={{
                    height: 43, backgroundColor: '#FFFFFF', borderBottomWidth: 0.4,
                    borderColor: '#ADADAD', flexDirection: 'row', alignItems: 'flex-start',justifyContent:'center'
                }}>
                        <ButtonGroup
                            containerStyle={{height:27,width:200}}
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={buttons} />

                </View>


                {this.renderPage()}
                

            </View>
        );
    }
}