/*
 APP的初始化业务
 */
import AV from 'leancloud-storage';


export default class AppInitService {

    static init(fun) {
        AppInitService.leancloudInit();
        AppInitService.appInit();
        AppInitService.cloudInit(fun);
    }

    /*
     leancloud 初始化
     */
    static leancloudInit() {
        // console.log('connect successful');
    }
    /*
     app 初始化
     */
    static appInit() {

    }

    static cloudInit(fun) {

        const query = new AV.Query('Config');
        // 查询 priority 是 0 的 Todo
        query.equalTo('name', 'version');
        query.find().then(ret => {
            const newVersion = (ret[0]).get('value');
            // console.log('here');
                    const query2 = new AV.Query('Config');
                    query2.find().then(rets => {
                        try{
                            var query = new AV.Query('LunBoImg');
                            query.find().then(function (results) {

                                let realm= AppInitService.getRealm();
                                realm.write(() => {
                                    // console.log('here');
                                    realm.delete(realm.objects('Config'));
                                    for (let ii = 0; ii < rets.length; ii++) {
                                        realm.create('Config', {
                                            name: rets[ii].get('name'),
                                            value: rets[ii].get('value'),
                                            valueDate: rets[ii].get('valueDate')
                                        });
                                    }
                                    // console.log('here');
                                    realm.delete(realm.objects('LunBoImg'));
                                    for(var il=0;il<results.length;il++){
                                        realm.create('LunBoImg', {
                                            id: results[il].id,
                                            url: results[il].get('url'),
                                            type: results[il].get('type'),
                                            value:results[il].get('value')
                                        });
                                        // console.log('here');
                                    }
                                    // console.log('here');
                                });

                                // console.log('here');

                                fun();
                            }, function (error) {
                            });


                        }catch(e){
                            fun();
                        }
                    });

        }, err => {
            fun();
        }, err3 => {
            fun();
        });
    }

    static getRealm(){
        var Realm = require('realm');

        const CourseSchema = {
            name: 'Course',
            properties: {
                objectId:  'string',
                keChengHao:  'string',
                xueFen:  'int',
                jiaoShi:  'string',
                xiaoQu:  'string',
                teacher:  'string',
                xingQi:  'int',
                jieCi:  'int',
                jiaoXueLou:  'string',
                kaoShiLeiXing:  'string',
                jieShu:  'int',
                zhouCi:  'string',
                xuanKeZhuangTai:  'string',
                xiuDuFangShi:  'string',
                keChengShuXing:  'string',
                keXuHao:  'string',
                peiYangFangAn:  'string',
                keChengMing: 'string'
            }
        };
        const FolloweeSchema = {
            name: 'Followee',
            properties: {
                id: 'string',
                petName: 'string',
                headimg: 'string'
            }
        };
        const ConfigSchema = {
            name: 'Config',
            properties: {
                name: 'string',
                value: 'string',
                valueDate: 'date'
            }
        };
        const LunBoImgSchema = {
            name: 'LunBoImg',
            properties: {
                id: 'string',
                url: 'string',
                type: 'int',
                value:'string'
            }
        };
        const CollectionSchema = {
            name: 'Collection',
            properties: {
                id: 'string',
                title: 'string',
                headimg: 'string'
            }
        };
        const HistorySchema = {
            name: 'History',
            properties: {
                id: 'string',
                title: 'string',
                headimg: 'string',
                type: 'string',
                datetime: 'date'
            }
        };
        const AppStorageSchema = {
            name: 'AppStorage',
            properties: {
                name: 'string',
                string: {type: 'string', default: ''},
                int:{type: 'int', default: 0},
                date: {type: 'date', default: new Date()},
                bool:{type: 'bool', default: true}
            }
        };
        return new Realm({schema: [CourseSchema,FolloweeSchema,CollectionSchema,HistorySchema,LunBoImgSchema,ConfigSchema,AppStorageSchema]});
    }

}
