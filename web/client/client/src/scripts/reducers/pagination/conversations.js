import { moveItemToFront } from 'app/utils';
import { createPaginationReducer } from 'app/utils/reducers';
import * as ActionTypes from 'app/ActionTypes';

const reducer = createPaginationReducer([
  ActionTypes.REQUEST_CONVERSATIONS,
  ActionTypes.RECEIVE_CONVERSATIONS_SUCCESS,
  ActionTypes.RECEIVE_CONVERSATIONS_FAILURE,
], {
  RECEIVE_MESSAGE: (state, action) => {
    const { conversationId } = action.payload;
    return {
      ...state,
      ids: moveItemToFront(state.ids, id => id === conversationId),
    };
  },
});

export default reducer;
