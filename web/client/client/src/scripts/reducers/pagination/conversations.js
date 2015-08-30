import { moveItemToFront } from 'app/utils';
import { createPaginationReducer } from 'app/utils/reducers';
import * as ActionTypes from 'app/ActionTypes';

const reducer = createPaginationReducer([
  ActionTypes.REQUEST_CONVERSATIONS,
  ActionTypes.RECEIVE_CONVERSATIONS,
  ActionTypes.FAILURE_CONVERSATIONS,
], {

  RECEIVE_MESSAGE: (state, action) => {
    const { conversationId } = action.payload;
    const others = (state.ids || []).filter(id => id !== conversationId);
    const ids = [conversationId, ...others];
    return {
      ...state,
      ids,
    };
  },

  [ActionTypes.CREATE_CONVERSATION_SUCCESS]: (state, action) => {
    if (!state.ids) {
      return state;
    }
    const { result: conversationId } = action.response;
    const ids = [conversationId, ...(state.ids || [])];
    return {
      ...state,
      ids,
    };
  },
});

export default reducer;
