import { createEntityReducer } from 'app/utils/reducers';

const reducer = createEntityReducer('messages', {

  RECEIVE_MESSAGE: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      [message.id]: message,
    };
  },
});

export default reducer;
