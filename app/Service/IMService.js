import AV from 'leancloud-storage';

export default class IMService {
    static signatureFactory(clientId){
        var currentUser = AV.User.current();
        return fetch('https://nmdim.leanapp.cn/app/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"userId":"' + currentUser.getObjectId() + '","skey":"' + currentUser.get('skey') + '"}'
        }).then((response) => response.json());
    }

    static conversationSignatureFactory(conversationId, clientId, targetIds, action){
        var currentUser = AV.User.current();
        return fetch('https://nmdim.leanapp.cn/app/sign2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"userId":"' + currentUser.getObjectId() + '","skey":"' + currentUser.get('skey') + '","conv_id":"' + conversationId + '","members":"' + targetIds + '","action":"' + action +'"}'
        }).then((response) => response.json());
    }
}
