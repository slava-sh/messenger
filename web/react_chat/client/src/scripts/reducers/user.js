import { handleActions } from 'redux-actions';

const initialState = {
  name: 'Anonymous',
};

const reducer = handleActions({}, initialState);

export default reducer;
