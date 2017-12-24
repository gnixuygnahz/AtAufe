/**
 * Created by anytime on 16/10/7.
 */
import * as TYPES from './../Actions/types';

const initialState = {
    navigator: {},
    id: '',
    petName: '',
    headimg: '',
    imClient: {}
};

export default function (state=initialState,action) {
    switch (action.type){
        case TYPES.SET_NAVIGATOR:
            return {
                ...state,
                navigator: action.navigator,
            };
            break;
        case TYPES.SET_USERINFO:
            return {
                ...state,
                id: action.id,
                petName: action.userData.petName,
                headimg: action.userData.headimg,
            };
            break;
        case TYPES.SET_IMCLIENT:
            return {
                ...state,
                imClient: action.imClient
            };
            break;
        default:
            return state;
    }
}