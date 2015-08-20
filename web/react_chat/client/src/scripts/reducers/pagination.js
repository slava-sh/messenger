import { combineReducers } from 'redux';
import paginate from 'app/reducers/paginate';

const reducer = combineReducers({
  conversations: paginate({
    mapActionToKey: action => 'default', // TODO
    types: [
      'REQUEST_CONVERSATIONS',
      'RECEIVE_CONVERSATIONS_SUCCESS',
      'RECEIVE_CONVERSATIONS_FAILURE',
    ],
  }),
  messagesByConversation: paginate({
    mapActionToKey: action => action.conversation.id,
    types: [
      'REQUEST_MESSAGES',
      'RECEIVE_MESSAGES_SUCCESS',
      'RECEIVE_MESSAGES_FAILURE',
    ],
  }),
});

export default reducer;
