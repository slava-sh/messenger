import { combineReducers } from 'redux';
import { createReducer, createEntityReducer } from 'app/utils/reducers';
import byId from 'app/reducers/conversations/byId';
import all from 'app/reducers/conversations/all';

const reducer = combineReducers({
  byId,
  all,
});

export default reducer;
