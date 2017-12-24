/**
 * Created by anytime on 16/10/11.
 */
import React, { Component } from 'react';
import {
    View,
    RefreshControl
} from 'react-native';
import {ListView} from 'realm/react-native';

export default class CloudListRealm extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    if(!r1.isValid()){
                        return true;
                    }
                    return r1.id !== r2.id;
                }
            }),
            isRefreshing:false
        };
        this._data=[];
        this.page=0;
        this.pageSize=15;
        this.load=true;
        this.isLocked=true;
        this.first=true;
    }

    componentDidMount() {
        this.pageSize=this.props.pageSize;
        this.getData();
    }

    getData(fun) {
        if(this.load) {
            let _page = this;
            this.props.dataLoad(_page.pageSize,_page.pageSize * _page.page,function (results) {
                if (results && results[0] != null) {
                    _page.page++;
                    _page.addNewData(results);
                    _page.isLocked = false;

                } else {
                    _page.load = false;
                }
                if(fun){
                    _page.finishRefresh();
                }
            });
        }
    }


    addNewData(newData){
        if(this.first){
            setTimeout(()=>{
                this._data=this._data.concat(newData);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data)
                });
            },300);
            this.first=false;
        }else{
            this._data=this._data.concat(newData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this._data)
            });
        }
    }

    loadNew(){
        if(!this.isLocked) {
            this.isLocked=true;
            this.getData();
        }
    }

    _onRefresh(){
        this.setState({isRefreshing: true});
        this._refreshData();
        this.getData(true);
    }

    finishRefresh(){
        this.setState({isRefreshing: false});
    }

    _refreshData(){
        this._data=[];
        this.setState({
            dataSource: new ListView.DataSource(
                {
                    rowHasChanged: (r1, r2) => r1.id !== r2.id
                }),
        });
        this.page=0;
        this.pageSize=4;
        this.load=true;
        this.isLocked=true;
    }

    deleteData(rowID){
        this._data.splice(parseInt(rowID),1);
        this._data=[].concat(this._data);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data)
        });
    }

    deleteAll(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([])
        });
    }

    render() {
        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this.loadNew.bind(this)}
                    refreshControl={

                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>{
                                this._onRefresh();
                            }}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />

                    }
                    onEndReachedThreshold={this.props.onEndReachedThreshold}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => {
                        return this.props.renderRow(rowData, sectionID, rowID, highlightRow);
                    }}
                />

            </View>
        );
    }
}