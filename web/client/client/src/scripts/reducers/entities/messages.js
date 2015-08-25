import { createEntityReducer } from 'app/utils/reducers';
import * as ActionTypes from 'app/ActionTypes';

const reducer = createEntityReducer('messages', {

  [ActionTypes.RECEIVE_MESSAGE]: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      [message.id]: message,
    };
  },
});

export default reducer;
