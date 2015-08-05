import { handleActions } from 'redux-actions';

const initialState = [];

const reducer = handleActions({
  RECEIVE_MESSAGES: (state, action) => action.payload.messages
}, initialState);

export default reducer;
