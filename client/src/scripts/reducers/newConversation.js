import { createReducer } from 'app/utils/reducers';
import { CREATE_CONVERSATION, CREATE_CONVERSATION_SUCCESS } from 'app/ActionTypes';

const initialState = null;

const reducer = createReducer(initialState, {

  [CREATE_CONVERSATION]: () => initialState,

  [CREATE_CONVERSATION_SUCCESS]: (state, action) => {
    const {
      result: conversationId,
      entities: { conversations },
    } = action.response;
    return conversations[conversationId];
  },
});

export default reducer;
