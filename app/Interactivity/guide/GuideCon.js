import AV from 'leancloud-storage';
import AppInitService from './../../Service/AppInitService';
export default class GuideCon {
    constructor(page) {
        this.page = page;
    }
    init() {
        page=this.page;
        const timeoutMs = 500; // 2 seconds
        setTimeout(() => {
            AppInitService.init(() => {
                AV.User.currentAsync().then(user => {
                    if (user) {


                        page.jumpToMain();
                        // 跳转到首页
                    } else {
                        page.jumpToLogin();
                    }
                }).catch(err => {
                    if(AV.User.current()) {
                        page.jumpToMain();
                    }else{
                        page.xAlert();
                    }
                });
            });
        }, timeoutMs);
    }
}
