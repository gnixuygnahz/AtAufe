import ArtCommentService from './../../Service/ArtCommentService';

export default class CommentCon {
    constructor(page){
        this._page = page;
    }

    getData(fun) {
        if(this._page.load) {
            let _page = this._page;
            ArtCommentService.getComments(_page.props.id,_page.page,_page.pageSize,'createdAt',true).then(function (results) {
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
            }, function (error) {
            })
        }
    }

    like(i,commentObjId){
        let page=this._page;
        ArtCommentService.likeComment(commentObjId,function (num) {
            if(num==1){
                page.showMsg('点赞成功');
            }else{
                page.showMsg('已取消点赞');
            }
            page.addLike(i,num);
        },function (error) {
            page.showMsg(error);
        });
    }
}