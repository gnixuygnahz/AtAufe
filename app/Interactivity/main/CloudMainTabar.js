import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,Platform,BackAndroid,ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {  View } from 'react-native-animatable';

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        overflow:"visible"
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        overflow:"visible"
    },
});
const CloudMainTabBar = React.createClass({
    tabIcons: [],


    onclickc(i){
        this.props.myPage.pageIndex=i;
        this.refs["menuClick"+i].bounceIn(1000);
        this.props.goToPage(i);
        this.tabIcons.forEach((icon, ii) => {
            var color=ii==i ? AppColor.menuIconSelected : AppColor.menuIconUnselected;
            icon.setNativeProps({
                style: {
                    color: color,
                },
            });
        });

    },


    render() {
        return <View style={[styles.tabs, this.props.style]}>
            {this.props.tabs.map((tab, i) => {
                return (<TouchableOpacity
                    key={tab}
                    onPress={() => this.onclickc(i)} style={styles.tab} activeOpacity={1}
                >
                    <View ref={"menuClick"+i}  style={{overflow:"visible"}}>
                    <Icon
                        style={{overflow:"visible"}}
                        name={tab}
                        size={26}
                        color={this.props.activeTab === i ? AppColor.menuIconSelected : AppColor.menuIconUnselected}
                        ref={(icon) => { this.tabIcons[i] = icon; }}
                    />
                    </View>
                    <Text style={{fontSize: 8}}>{this.props.tabText[i]}</Text>

                </TouchableOpacity>);
            })}
        </View>;
}}
);

export default CloudMainTabBar;
