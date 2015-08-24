import contains from 'lodash/collection/includes';
import { createKeyedReducer, createPaginationReducer } from 'app/utils/reducers';
import * as pagination from 'app/utils/apiPagination';

const messagePagination = createPaginationReducer([
  'REQUEST_MESSAGES',
  'RECEIVE_MESSAGES_SUCCESS',
  'RECEIVE_MESSAGES_FAILURE',
], {
  RECEIVE_MESSAGE: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      ids: [message.id, ...(state.ids || [])],
    };
  },
  RECEIVE_CONVERSATION_SUCCESS: (state, action) => {
    const { conversationId } = action.payload;
    const { conversations } = action.response.entities;
    const conversation = conversations[conversationId];
    // TODO: check if we don't have these yet
    return {
      ...state,
      ids: pagination.getCollection(conversation.messages),
      nextCursor: pagination.getCursor(conversation.messages),
      isLoaded: true,
    };
  },
});

const reducer = createKeyedReducer(
  action => contains(['REQUEST_MESSAGES', 'RECEIVE_MESSAGES_SUCCESS', 'RECEIVE_MESSAGES_FAILURE', 'RECEIVE_MESSAGE', 'RECEIVE_CONVERSATION_SUCCESS'], action.type)
    && String(action.payload.conversationId), // TODO: refactor
  messagePagination,
);

export default reducer;
