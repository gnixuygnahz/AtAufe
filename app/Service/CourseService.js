/**
 * Created by anytime on 16/9/20.
 */
import AV from 'leancloud-storage';
import DatetimeUtil from './../Util/DatetimeUtil';
import AppInitService from './AppInitService';

export default class CourseService {
    static getNowCourse(fun) {

                let realm = AppInitService.getRealm();
                let week= DatetimeUtil.getWeekNumFromTermBegin(new Date(realm.objects('Config').filtered('name = "termBeginDate"')[0].valueDate));
                let ret = realm.objects('Course');

                    let ret2=[];
                    if(ret){
                        for(let i=0;i<ret.length;i++){
                            let type= ret[i].zhouCi.split("周")[0];
                            if(type=="单"&&week%2!=0){
                                ret2.push(ret[i]);
                            }else if(type=="双"&&week%2==0){
                                ret2.push(ret[i]);
                            }else if(type.indexOf("-")>0){
                                weeks=type.split("-");
                                if(parseInt(weeks[0])<=week&&week<=parseInt(weeks[1])){
                                    ret2.push(ret[i]);
                                }
                            }
                        }
                        fun(ret2);
                    }


    }

    static getNetCourse(){
        let relation = AV.User.current().relation('kebiao');
        let query = relation.query();
        return query.find();
    }
}