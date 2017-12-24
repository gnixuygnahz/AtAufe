/**
 * Created by anytime on 16/9/27.
 */

import * as TYPES from './types';

export function addOfflineMessage(conversationId, name, headimg, lastTime, readNum) {
    return {
        'type': TYPES.ADD_OFFLINE_MESSAGE,
        'conversationId': conversationId,
        'name': name,
        'headimg': headimg,
        'lastTime': lastTime,
        'unReadNum': readNum
    }
}

export function addOnlineMessage(conversationId, name, headimg, lastTime) {
    return {
        'type': TYPES.ADD_ONLINE_MESSAGE,
        'conversationId': conversationId,
        'name': name,
        'headimg': headimg,
        'lastTime': lastTime
    }
}

export function readMessage(id) {
    return {
        'type': TYPES.READ_MESSAGE,
        'id': id
    }
}

export function deleteMessage(id) {
    return {
        'type': TYPES.DELETE_MESSAGE,
        'id': id
    }
}



