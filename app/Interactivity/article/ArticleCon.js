import AV from 'leancloud-storage';
import ArticleService from './../../Service/ArticleService';
import AppInitSerice from './../../Service/AppInitService';

export default class FirstCon {
    constructor(page){
        this._page = page;
    }

    init(){
        let page=this._page;
        var query = new AV.Query('Articles');
        query.get(page.props.id).then(function (data) {
            setTimeout(()=>{
                page.setLikeNum(data.get('likeNum'));
                page.setCommentNum(data.get('commentNum'));
                page.setTitle(data.get('title'));
                page.setAuthorId(data.get('author').get('objectId'));

                if(!page.props.isHistory){
                    let realm = AppInitSerice.getRealm();

                    realm.write(() => {
                        realm.delete(realm.objects('History').filtered('id = "'+page.props.id+'"'));
                    });

                    realm.write(() => {
                        realm.create('History', {
                            id: page.props.id,
                            title: data.get('title'),
                            headimg: '',
                            type: 'article',
                            datetime: new Date()
                        });
                    });
                }

            },500);
        }, function (error) {
            // 失败了
        });
    }

    like(){
        let page=this._page;
        ArticleService.like(this._page.props.id,function (num) {
            if(num==1){
                page.showMsg('点赞成功');
            }else{
                page.showMsg('已取消点赞');
            }
            page.addLike(num);
        },function (err) {
            page.showMsg(err);
        });
    }
}