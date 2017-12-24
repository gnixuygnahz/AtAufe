import { combineReducers } from 'redux';
import messageReducer from './message';
import appReducer from './app';

export default combineReducers({
    messageStore: messageReducer,
    appStore: appReducer
});
