import { combineReducers } from 'redux';
import { createReducer, createEntityReducer } from 'app/utils/reducers';

const reducer = combineReducers({
  byId: createEntityReducer('users'),
  current: createReducer({
    id: null,
  }),
});

export default reducer;
