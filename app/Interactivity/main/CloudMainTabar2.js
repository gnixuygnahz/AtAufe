/**
 * Created by anytime on 16/11/24.
 */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,Platform,BackAndroid,ToastAndroid,View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionButton } from 'react-native-material-ui';


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



    render() {
        return <View style={[styles.tabs]}>
            <ActionButton actions={['首页','发现','课表','功能','我的']} />
        </View>;
    }}
);

export default CloudMainTabBar;
