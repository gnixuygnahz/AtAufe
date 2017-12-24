import React, { Component } from 'react';
import {
    View,
    ListView,
    RefreshControl
} from 'react-native';
import AV from 'leancloud-storage';

let page1;
export default class CloudList extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    return r1.id !== r2.id;
                }
            }),
            isRefreshing:false
        };
        this._data=[];

        this.load=true;
        this.isLocked=true;
        this.first=true;

        this.type='Articles';
        this.search='';
        this.query=false;

        page1=this;
    }

    componentDidMount() {
        this.pageSize=this.props.pageSize;
        this.getData();
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    getData(fun) {
        if(page1.load) {


            if(page1.search!==''){
                if(page1.query){
                    if(page1.query.hasMore()){

                        page1.query.find().then(function(results) {

                            console.log(page1.query.hits());
                            if(!page1.query.hasMore()){
                                page1.load = false;
                            }
                            if (results && results[0] != null) {
                                page1.page++;
                                page1.addNewData(results);
                                page1.isLocked = false;

                            } else {
                                page1.load = false;
                            }
                            if(fun){
                                page1.finishRefresh();
                            }

                        }).catch(function(err){
                            console.log(err);
                        });
                    }
                }else{
                    page1.query = new AV.SearchQuery(page1.type);
                    page1.query.queryString(page1.search);
                    page1.query.limit(30);
                    page1.query.find().then(function(results) {
                        console.log(page1.query.hits());
                        if(!page1.query.hasMore()){
                            page1.load = false;
                        }
                        if (results && results[0] != null) {
                            page1.page++;
                            page1.addNewData(results);
                            page1.isLocked = false;

                        } else {
                            page1.load = false;
                        }
                        if(fun){
                            page1.finishRefresh();
                        }

                    }).catch(function(err){
                        console.log(err);
                        //处理 err
                    });
                }
            }

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

    reset(type,search){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                page1.type=type;
                page1.search=search;
                page1.query=false;

                page1.load=true;
                page1.first=true;
                page1._data=[];
                page1.deleteAll();
                page1.getData();
            },
            1000
        );

    }

    deleteAll(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([])
        });
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

    render() {
        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this.loadNew.bind(this)}

                    onEndReachedThreshold={this.props.onEndReachedThreshold}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => {
                        return this.props.renderRow(rowData, sectionID, rowID, highlightRow);
                    }}
                />

            </View>
        );
    }
}