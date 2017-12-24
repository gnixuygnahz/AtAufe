/**
 * Created by anytime on 16/9/27.
 */
import * as TYPES from './../Actions/types';

const initialState = {
    conversation: [], // 对话 { conversationId,name,headimg,lastTime,unReadNum }
    unReadNum: 0, // 未读对话数量

};

export default function (state=initialState,action) {
    switch (action.type){
        case TYPES.ADD_OFFLINE_MESSAGE: // 'unreadmessages'
            let conversation = [].concat(state.conversation);
            for(let i=0;i<conversation.length;i++){
                if(conversation[i].conversationId==action.conversationId){
                    conversation.splice(i,1);
                }
            };
            conversation.push({unReadNum:action.unReadNum,conversationId:action.conversationId,name:action.name,headimg:action.headimg,lastTime:action.lastTime});
            let unReadNum = countUnReadNum(conversation);
            return {
                ...state,
                conversation:conversation,
                unReadNum:unReadNum
            };
            break;
        case TYPES.ADD_ONLINE_MESSAGE: // 'message'
            let flat=false;
            let num=0;
            let conversation3 = [].concat(state.conversation);
            for(let i=0;i<conversation3.length;i++){
                if(conversation3[i].conversationId===action.conversationId){
                    conversation3[i].unReadNum++;
                    flat=true;
                    break;
                }
            };
            if(!flat){
                conversation3.push({unReadNum:1,conversationId:action.conversationId,name:action.name,headimg:action.headimg,lastTime:action.lastTime});
            }
            let unReadNum3 = countUnReadNum(conversation3);
            return {
                ...state,
                conversation:conversation3,
                unReadNum:unReadNum3
            };
            break;
        case TYPES.READ_MESSAGE:
            let conversation1 = [].concat(state.conversation);
            for(let i=0;i<conversation1.length;i++){
                if(conversation1[i].conversationId===action.id){
                    conversation1[i].unReadNum=0;
                    break;
                }
            };
            let unReadNum1 = countUnReadNum(conversation1);
            return {
                ...state,
                conversation:conversation1,
                unReadNum:unReadNum1
            };
            break;
        case TYPES.DELETE_MESSAGE:
            let conversation2 = [].concat(state.conversation);
            for(let i=0;i<conversation2.length;i++){
                if(conversation2[i].conversationId===action.id){
                    conversation2.splice(i,1);
                    break;
                }
            };
            let unReadNum2 = countUnReadNum(conversation2);
            return {
                ...state,
                conversation:conversation2,
                unReadNum:unReadNum2
            };
            break;
        default:
            return state;
    }
}

function countUnReadNum(conversation){
  let unReadNum=0;
  for(let i=0;i<conversation.length;i++){
      if(conversation[i].unReadNum>0){
          unReadNum++;
      }
  };
  return unReadNum;
}
