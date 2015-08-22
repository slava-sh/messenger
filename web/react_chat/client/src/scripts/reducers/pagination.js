import { combineReducers } from 'redux';
import { createKeyedReducer, createPaginationReducer } from 'app/utils/reducers';

const reducer = combineReducers({
  conversations: createPaginationReducer([
    'REQUEST_CONVERSATIONS',
    'RECEIVE_CONVERSATIONS_SUCCESS',
    'RECEIVE_CONVERSATIONS_FAILURE',
  ]),
  messagesByConversation: createKeyedReducer(
    action => action.payload && action.payload.conversationId,
    createPaginationReducer([
      'REQUEST_MESSAGES',
      'RECEIVE_MESSAGES_SUCCESS',
      'RECEIVE_MESSAGES_FAILURE',
    ])
  ),
});

export default reducer;
