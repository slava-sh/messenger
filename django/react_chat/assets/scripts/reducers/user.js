import { handleActions } from 'redux-actions';

const initialState = {
  name: 'Anonymous',
  csrfToken: null
};

const reducer = handleActions({
}, initialState);

export default reducer;
