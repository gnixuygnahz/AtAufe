import React, { Component } from 'react';
import { Text, View ,StyleSheet,Dimensions,
    Image,StatusBar,ScrollView,
    TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import Icon from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ArticlePage from './../article/ArticlePage';
import WebPage from './../web/WebPage';
import AppInitService from './../../Service/AppInitService';
import ViewPager from 'react-native-viewpager';
import YktPage from './ykt/YktPage';
import HqbxPage from './hqbx/HqbxPage';
import CjcxPage from './cjcx/CjcxPage';
import SjfcxPage from './sjfcx/SjfcxPage';
import WebPage2 from './../web/Web2Page';
import Toast from 'react-native-root-toast';



var deviceWidth = Dimensions.get('window').width;
var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:deviceWidth/2,
        margin:0
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        height:deviceWidth/2
    },
    viewpager: {
        flex: 1,
    },
    gird:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:0.2,
        borderBottomWidth:0.2,
        borderColor:'#EBEBEB',
        paddingTop:12,
        paddingBottom:12,
    },
    text:{
        marginTop:7,
        fontSize:10
    }
});

let AppStyle = require('./../../UICom/StyleManager').Style;
let AppColor = require('./../../UICom/StyleManager').Color;

export default class KebiaoPage extends Component {

    constructor(props){
        super(props);
        let realm= AppInitService.getRealm();

        this._data= [];
        let da=realm.objects('LunBoImg');
        for(let i=0;i<da.length;i++){
            this._data[i]={id:da[i].id,url:da[i].url,type:da[i].type,value:da[i].value};
        }
        this.state={
            lunbo:new ViewPager.DataSource({
                pageHasChanged: (p1, p2) =>  p1!== p2,
            }).cloneWithPages(this._data)
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


    render() {
        let realm = AppInitService.getRealm();
        let configs = realm.objects('Config');
        let xiaoli = configs.filtered('name = "xiaoli"');
        const { navigator } = this.props;
        return (
            <View style={AppStyle.container}>
                <StatusBar
                    translucent={true}
                    barStyle="light-content"
                />
                <View style={styles.page}>
                    <ViewPager
                        style={styles.viewpager}
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
                        autoPlay={true}/>
                </View>
                <ScrollView style={{flex:1}}>
                <View style={{backgroundColor:'#FFF', marginTop:10,flex:1}}>
                    <View style={{backgroundColor:'#FFF',borderBottomWidth:1,borderBottomColor:'#EBEBEB',flexDirection:'column',justifyContent:'center',}}>
                        <Text style={{margin:11}}>生活日常</Text>
                    </View>
                    <Row size={4}>
                        <Col sm={1} md={4} lg={3}>
                            <TouchableOpacity style={styles.gird}
                                              activeOpacity={1} onPress={
                                ()=>{
                                    navigator.push({
                                        name: 'YktPage',
                                        component: YktPage,
                                    });
                                }
                            }
                            >

                                <Icon2 name="credit-card" size={30} color="#E64746" />
                                <Text style={styles.text}>
                                    校园一卡通
                                </Text>
                            </TouchableOpacity>
                        </Col>
                        <Col sm={1} md={4} lg={3}>
                            <TouchableOpacity style={styles.gird}
                                              activeOpacity={1} onPress={
                                ()=>{
                                    navigator.push({
                                        name: 'HqbxPage',
                                        component: HqbxPage,
                                    });
                                }
                            }>
                                <Icon2 name="settings-applications" size={30} color="#5CA0E7" />
                                <Text style={styles.text}>
                                    后勤报修
                                </Text>
                            </TouchableOpacity>

                        </Col>
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="loyalty" size={30} color="#FF6919" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*失物招领*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="restaurant" size={30} color="grey" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*安财餐厅*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}





                    {/*</Row>*/}
                    {/*<Row size={4}>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="people" size={30} color="#F2A738" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*校长助理团*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="public" size={30} color="#F2A738" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*校内搜索*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="map" size={30} color="#5052CC" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*地图导航*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="local-library" size={30} color="grey" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*安财图书馆*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}





                    </Row>
                </View>
                    <View style={{backgroundColor:'#FFF', marginTop:10,flex:1}}>
                        <View style={{backgroundColor:'#FFF',borderBottomWidth:1,borderColor:'#EBEBEB',flexDirection:'column',justifyContent:'center',}}>
                            <Text style={{margin:11}}>学习辅助</Text>
                        </View>

                    <Row size={4}>

                        <Col sm={1} md={4} lg={3}>
                            <TouchableOpacity style={styles.gird}
                                              activeOpacity={1} onPress={
                                ()=>{
                                    navigator.push({
                                        name: 'SjfcxPage',
                                        component: SjfcxPage,
                                    });
                                }
                            }
                            >

                                <Icon2 name="find-in-page" size={30} color="#E64746" />
                                <Text style={styles.text}>
                                    实践分查询
                                </Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={1} md={4} lg={3}>
                            <TouchableOpacity style={styles.gird}
                                              activeOpacity={1} onPress={
                                ()=>{
                                    navigator.push({
                                        name: 'CjcxPage',
                                        component: CjcxPage,
                                    });
                                }
                            }
                            >

                                <Icon2 name="subject" size={30} color="#E64746" />
                                <Text style={styles.text}>
                                    成绩查询
                                </Text>
                            </TouchableOpacity>
                        </Col>

                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<TouchableOpacity style={styles.gird}*/}
                                              {/*activeOpacity={1} onPress={*/}
                                {/*()=>{*/}
                                    {/*this.showMsg("暂未开放");*/}
                                {/*}*/}
                            {/*}>*/}
                                {/*<Icon2 name="search" size={30} color="#5CA0E7" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*四六级查询*/}
                                {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</Col>*/}

                        {/*<Col sm={1} md={4} lg={3}>*/}

                            {/*<TouchableOpacity style={styles.gird}*/}
                                              {/*activeOpacity={1} onPress={*/}
                                {/*()=>{*/}
                                    {/*navigator.push({*/}
                                        {/*name: 'WebPage2',*/}
                                        {/*component: WebPage2,*/}
                                        {/*params: {*/}
                                            {/*id:xiaoli[0].value*/}
                                        {/*}*/}
                                    {/*});*/}
                                {/*}*/}
                            {/*}*/}
                            {/*>*/}

                                {/*<Icon2 name="date-range" size={30} color="#E64746" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*校历*/}
                                {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</Col>*/}





                    </Row>

                    </View>
                    {/**/}
                {/*<View style={{backgroundColor:'#FFF', marginTop:10,flex:1}}>*/}
                    {/*<View style={{backgroundColor:'#FFF',borderBottomWidth:1,borderColor:'#EBEBEB',flexDirection:'column',justifyContent:'center',}}>*/}
                        {/*<Text style={{margin:11}}>我在安财</Text>*/}
                    {/*</View>*/}

                    {/*<Row size={4}>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="card-giftcard" size={30} color="grey" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*每日推荐*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="directions-bus" size={30} color="grey" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*公交旅游*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="work" size={30} color="#5052CC" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*校内兼职*/}
                                {/*</Text>*/}
                            {/*</View>*/}

                        {/*</Col>*/}
                        {/*<Col sm={1} md={4} lg={3}>*/}
                            {/*<View style={styles.gird}>*/}
                                {/*<Icon2 name="face" size={30} color="#FF6919" />*/}
                                {/*<Text style={styles.text}>*/}
                                    {/*情缘结*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</View>*/}
                    {/**/}
                </ScrollView>
            </View>
        );
    }
}


