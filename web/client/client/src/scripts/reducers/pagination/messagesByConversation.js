import contains from 'lodash/collection/includes';
import { createKeyedReducer, createPaginationReducer } from 'app/utils/reducers';
import { stripPagination, getCursor } from 'app/utils/apiPagination';
import * as ActionTypes from 'app/ActionTypes';

const messagePagination = createPaginationReducer([
  ActionTypes.REQUEST_MESSAGES,
  ActionTypes.RECEIVE_MESSAGES,
  ActionTypes.FAILURE_MESSAGES,
], {
  RECEIVE_MESSAGE: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      ids: [message.id, ...(state.ids || [])],
    };
  },
  RECEIVE_CONVERSATION: (state, action) => {
    const { conversationId } = action.payload;
    const { conversations } = action.response.entities;
    const conversation = conversations[conversationId];
    // TODO: check if we don't have these yet
    return {
      ...state,
      ids: stripPagination(conversation.messages),
      nextCursor: getCursor(conversation.messages),
      isLoaded: true,
    };
  },
});

const reducer = createKeyedReducer(
  action => contains([
    ActionTypes.REQUEST_MESSAGES,
    ActionTypes.RECEIVE_MESSAGES,
    ActionTypes.FAILURE_MESSAGES,
    ActionTypes.RECEIVE_MESSAGE,
    ActionTypes.RECEIVE_CONVERSATION,
  ], action.type) && String(action.payload.conversationId), // TODO: refactor
  messagePagination,
);

export default reducer;
