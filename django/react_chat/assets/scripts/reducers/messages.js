import { handleActions } from 'redux-actions';

export const initialState = [];

export const reducer = handleActions({
  RECEIVE_MESSAGES: (state, action) => action.payload.messages
}, initialState);

export default reducer;
