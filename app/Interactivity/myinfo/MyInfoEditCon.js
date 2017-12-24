import UserService from './../../Service/UserService';
import AV from 'leancloud-storage';
import {Alert} from 'react-native';
export default class MyInfoEditCon {
    constructor(page){
        this._page = page;
    }
    updateHeadimg(data) {

        page=this._page;
        var currentUser = AV.User.current();
        this._page.showLoading();
        UserService.updateHeadimg(currentUser.getUsername(), currentUser.get('skey'), data, function () {
            page.hideLoading();
            page.showMsg('设置成功');
            page.refresh();
        }, function (err) {
            page.hideLoading();

            page.showMsg(err);
        });
    }
    updateUserInfo(data) {
        page=this._page;
        this._page.showLoading();
        UserService.updateUserInfo(data,function () {
            page.hideLoading();
            var currentUser = AV.User.current();
            fetch('https://nmdim.leanapp.cn/app/setUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"userId":"' + currentUser.id + '","skey":"' + currentUser.get('skey') + '","name":"' + data.petName+'"}'
            });

            page.refresh();//

        },function (err) {
            page.hideLoading();
            if(err===137){
                AV.User.current().fetch();
                page.showMsg('昵称已存在~');
            }else {



                page.showMsg(err);
            }
        });
    };
}