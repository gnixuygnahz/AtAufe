/**
 * Created by anytime on 2016/11/30.
 */
import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,
    TouchableOpacity } from 'react-native';

import ViewPager from 'react-native-viewpager';
import ArticlePage from './../../article/ArticlePage';
import WebPage from './../../web/WebPage';

var deviceWidth = Dimensions.get('window').width;
var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:deviceWidth/3,
        margin:0
    }
});

//data格式：dataSource:[{type：1，外链，2，文章   value  url }]

export default class LunBoCom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lunbo: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2,
            }).cloneWithPages(this.props.data.dataSource)
        };

    }

    render() {

        const { navigator } = this.props;
        return (
                <ViewPager
                        style={this.props.style}
                        dataSource={this.state.lunbo}
                        renderPage={( data, pageID)=>{

                            var go;
                            switch (data.type){
                                case 1:
                                    go=WebPage;
                                    break;
                                case 2:
                                    go=ArticlePage;
                            }
                            return (
                                <TouchableOpacity style={styles.page} activeOpacity={1} onPress={
                                    ()=>{
                                        navigator.push({
                                            name: 'Lun',
                                            component: go,
                                            params: {
                                                id: data.value
                                            }
                                        });
                                    }
                                }>
                                    <Image
                                        source={{uri: data.url}}
                                        style={styles.page} />
                                </TouchableOpacity>
                            );
                        }}
                        isLoop={true}
                        autoPlay={true}
                />
        );
    }
}