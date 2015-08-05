import { handleActions } from 'redux-actions';

export const initialState = {
  name: 'Anonymous'
};

export const reducer = handleActions({
}, initialState);

export default reducer;
