import { combineReducers } from 'redux';
import contains from 'lodash/collection/includes';
import { createKeyedReducer, createPaginationReducer } from 'app/utils/reducers';

const reducer = combineReducers({
  conversations: createPaginationReducer([
    'REQUEST_CONVERSATIONS',
    'RECEIVE_CONVERSATIONS_SUCCESS',
    'RECEIVE_CONVERSATIONS_FAILURE',
  ]),
  messagesByConversation: createKeyedReducer(
    action => contains(['REQUEST_MESSAGES', 'RECEIVE_MESSAGES_SUCCESS', 'RECEIVE_MESSAGES_FAILURE'], action.type)
              && action.payload.conversationId, // TODO: refactor
    createPaginationReducer([
      'REQUEST_MESSAGES',
      'RECEIVE_MESSAGES_SUCCESS',
      'RECEIVE_MESSAGES_FAILURE',
    ])
  ),
});

export default reducer;
