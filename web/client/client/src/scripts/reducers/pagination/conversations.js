import { moveItemToFront } from 'app/utils';
import { createPaginationReducer } from 'app/utils/reducers';

const reducer = createPaginationReducer([
  'REQUEST_CONVERSATIONS',
  'RECEIVE_CONVERSATIONS_SUCCESS',
  'RECEIVE_CONVERSATIONS_FAILURE',
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
