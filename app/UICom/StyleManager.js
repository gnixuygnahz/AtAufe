/**
 * Created by anytime on 16/11/17.
 */
import { StyleSheet } from 'react-native';

var Global = {};



Global.defaultStyle = StyleSheet.create({
    container:{
        backgroundColor: '#E3E7F1',
        flex:1,
        flexDirection:'column',
    },
    toolbar:{
        height: 47,
        backgroundColor: '#FFFFFF' ,
        borderBottomWidth: 0.5,
        borderColor: '#E3E7F1',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchbar:{
        backgroundColor:'#E3E7F1',
        flex:1,
        height:30,
        borderRadius:4,
        margin:10,
        marginRight:0,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchbarText:{
        marginLeft:5,
        fontSize:13,
        color:'#60729B'
    },
    toolbarTitle:{
        color:'#60729B',
        fontSize:16
    }
});

Global.defaultColor = {
    mainIcon:"#60729B",
    mainIcon2:"",
    backgroundColor:"#E3E7F1"
};

Global.blueStyle = StyleSheet.create({
    container:{
        backgroundColor: '#EFF1F5',
        flex:1,
        flexDirection:'column',
    },
    toolbar:{
        paddingTop:16,
        height: 63,
        backgroundColor: '#3493FF' ,
        borderBottomWidth: 0.5,
        borderColor: '#E3E7F1',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchbar:{
        backgroundColor:'#FFF',
        flex:1,
        height:30,
        borderRadius:4,
        margin:10,
        marginRight:0,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchbarText:{
        marginLeft:5,
        fontSize:13,
        color:'#60729B'
    },
    toolbarTitle:{
        color:'#FFF',
        fontSize:16
    }
});

Global.blueColor = {
    mainIcon:"#FFF",
    toolbalIcon:"#FFF",
    mainIcon2:"",
    backgroundColor:"#EFF1F5",
    statusBarColor:'#00000000',
    menuIconSelected:"#3493FF",
    menuIconUnselected:"#E3E7F1",
    searchIcon:"#3493FF"
};

Global.Style = Global.blueStyle;

Global.Color = Global.blueColor;

module.exports = Global;