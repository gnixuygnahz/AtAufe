/**
 * Created by anytime on 16/9/18.
 */
import AV from 'leancloud-storage';

export default class ArticleService {


    static like(artObjId,finished,failed){
        var currentUser = AV.User.current();
        fetch('https://nmdim.leanapp.cn/app/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"userId":"' + currentUser.getObjectId() + '","skey":"' + currentUser.get('skey') + '","artObj":"' +artObjId+'"}'
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 0) {
                    if(responseJson.errMsg=='已取消点赞'){
                        finished(-1);
                    }else{
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
