import { combineReducers } from 'redux';
import { createEntityReducer, createSingletonReducer } from 'app/utils/reducers';
import * as ActionTypes from 'app/ActionTypes';

const reducer = combineReducers({
  byId: createEntityReducer('users'),
  current: createSingletonReducer([
    ActionTypes.REQUEST_CURRENT_USER,
    ActionTypes.RECEIVE_CURRENT_USER,
    ActionTypes.RECEIVE_CURRENT_USER_FAILURE,
  ]),
});

export default reducer;
