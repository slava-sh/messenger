import { combineReducers } from 'redux';
import {
  createEntityReducer,
  createSingletonReducer,
  createPaginationReducer,
} from 'app/utils/reducers';
import * as ActionTypes from 'app/ActionTypes';

const reducer = combineReducers({
  byId: createEntityReducer('users'),
  current: createSingletonReducer([
    ActionTypes.REQUEST_CURRENT_USER,
    ActionTypes.RECEIVE_CURRENT_USER,
    ActionTypes.RECEIVE_CURRENT_USER_FAILURE,
  ]),
  all: createPaginationReducer([
    ActionTypes.REQUEST_USERS,
    ActionTypes.RECEIVE_USERS,
    ActionTypes.FAILURE_USERS,
  ]),
});

export default reducer;
