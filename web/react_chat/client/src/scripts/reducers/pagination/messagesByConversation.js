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
});

const reducer = createKeyedReducer(
  action => contains(['REQUEST_MESSAGES', 'RECEIVE_MESSAGES_SUCCESS', 'RECEIVE_MESSAGES_FAILURE', 'RECEIVE_MESSAGE'], action.type)
    && String(action.payload.conversationId), // TODO: refactor
  messagePagination,
);

export default reducer;
