/**
 * Created by anytime on 16/10/7.
 */
import * as TYPES from './types';

export function setNavigator(navigator) {
    return {
        'type': TYPES.SET_NAVIGATOR,
        'navigator': navigator
    }
}

export function setUserInfo(id,petName,headimg) {
    return {
        'type': TYPES.SET_USERINFO,
        'userData': {
            id:id,
            petName: petName,
            headimg: headimg
        }
    }
}

export function setImClient(imClient) {
    return {
        'type': TYPES.SET_IMCLIENT,
        'imClient': imClient
    }
}