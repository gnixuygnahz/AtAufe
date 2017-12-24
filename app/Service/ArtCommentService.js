/**
 * Created by anytime on 16/9/18.
 */
import AV from 'leancloud-storage';

export default class ArtCommentService {
    static getComments(artObj, page, pageSize, scending, isDsc) {
        const query = new AV.Query('Comments');
        query.limit(pageSize);
        query.skip(pageSize * page);
        if (isDsc) {
            query.descending(scending);
        } else {
            query.ascending(scending);
        }
        const article = AV.Object.createWithoutData('Articles', artObj);
        query.equalTo('artObj', article);
        query.select(
            'objectId',
            'fromUserObj',
            'artObj',
            'content',
            'toCommentObj',
            'likeNum',
            'createdAt'
        );
        query.include('fromUserObj');
        query.include('toCommentObj');
        query.include('toCommentObj.fromUserObj');
        return query.find(); // 返回Promise类型
    }

    static addNewComment(userId, skey, artObj, content, finished, failed, toCommentObj) {
        fetch('https://nmdim.leanapp.cn/app/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"userId":"' + userId + '","skey":"' + skey + '","artObj":"' + artObj + '","content":"' + content + '","toCommentObj":"' + toCommentObj + '"}'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 0) {

                    finished();

                } else {
                    failed('上传错误:' + responseJson.errMsg + responseJson.status);
                }
            })
            .catch((error) => {
                failed('网络错误');
                console.error(error);
            });
    }


    static likeComment(commentObjId, finished, failed) {
        var currentUser = AV.User.current();
        fetch('https://nmdim.leanapp.cn/app/likeComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"userId":"' + currentUser.getObjectId() + '","skey":"' + currentUser.get('skey') + '","commentObj":"' + commentObjId + '"}'
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 0) {
                    if (responseJson.errMsg == '已取消点赞') {
                        finished(-1);
                    } else {
                        finished(1);
                    }
                } else {
                    failed('上传错误:' + responseJson.errMsg + responseJson.status);
                }
            })
            .catch((error) => {
                failed('网络错误');
                console.error(error);
            });
    }

}