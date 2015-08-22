import contains from 'lodash/collection/includes';
import { createKeyedReducer, createPaginationReducer } from 'app/utils/reducers';

const messagePagination = createPaginationReducer([
  'REQUEST_MESSAGES',
  'RECEIVE_MESSAGES_SUCCESS',
  'RECEIVE_MESSAGES_FAILURE',
], {
  RECEIVE_MESSAGE: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      ids: [...state.ids, message.id],
    };
  },
  RECEIVE_CONVERSATION_SUCCESS: (state, action) => {
    const { conversationId } = action.payload;
    const { conversations } = action.response.entities;
    const conversation = conversations[conversationId];
    // TODO: check if we don't have these its yet
    return {
      ...state,
      ids: conversation.messages,
    };
  },
});

const reducer = createKeyedReducer(
  action => contains(['REQUEST_MESSAGES', 'RECEIVE_MESSAGES_SUCCESS', 'RECEIVE_MESSAGES_FAILURE', 'RECEIVE_MESSAGE', 'RECEIVE_CONVERSATION_SUCCESS'], action.type)
    && String(action.payload.conversationId), // TODO: refactor
  messagePagination,
);

export default reducer;
