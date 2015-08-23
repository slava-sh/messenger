import { createReducer } from 'app/utils/reducers';

const initialState = {
  name: 'Anonymous',
};

const reducer = createReducer(initialState, {});

export default reducer;
