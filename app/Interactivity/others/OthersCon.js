import UserService from './../../Service/UserService';

export default class OthersCon {
    constructor(page){
        this._page = page;
    }

    init(id){
        let page = this._page;
        UserService.getOthers(id, function (data) {
            page.setInfo(data);
        }, function (err) {
            page.showMsg(err);
        });
    }
}