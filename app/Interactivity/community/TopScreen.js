'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform, Image, TouchableOpacity, Animated} from 'react-native';
import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';
import RecentPage from './RecentPage';
import ThemePage from './ThemePage';
import HotPage from './HotPage';

export default class TitleIndicatorPage extends Component {
    render() {
        return (


                <IndicatorViewPager
                    style={{flex: 1, paddingTop: 48}}
                    indicator={this._renderTitleIndicator()}
                    onPageScroll={this._onPageScroll.bind(this)}
                >
                    {<View><RecentPage></RecentPage></View>}
                    {<View><ThemePage></ThemePage></View>}
                    {<View><HotPage></HotPage></View>}
                    {<View><Text>ahhahah</Text></View>}
                </IndicatorViewPager>

        );
    }

    _renderTitleIndicator() {
        return (
            <PagerTitleIndicator
                style={styles.indicatorContainer}
                itemTextStyle={styles.indicatorText}
                selectedItemTextStyle={styles.indicatorSelectedText}
                selectedBorderStyle={styles.selectedBorderStyle}
                titles={['推荐', '圆桌', '热门','收藏']}
            />
        );
    }

    _onPageScroll(scrollData) {
        let {offset, position}=scrollData;
        if (position < 0 || position >= 3) return;

    }

}

const styles = StyleSheet.create({
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        height: 48,borderColor: '#ADADAD',borderBottomWidth: 0.3
    },
    indicatorText: {
        fontSize: 14,
        color: '#6F6F6F'
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: '#3D4045'
    },
    selectedBorderStyle: {
        height: 3,
        backgroundColor: '#2A62FF'
    },
    statusBar: {
        height: 24,
        backgroundColor: 0x00000044
    },
    toolbarContainer: {
        height: 56,
        backgroundColor: 0x00000020,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    backImg: {
        width: 16,
        height: 17
    },
    titleTxt: {
        marginLeft: 36,
        color: 'white',
        fontSize: 20
    }
});