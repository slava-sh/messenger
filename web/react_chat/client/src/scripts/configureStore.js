import { createStore, applyMiddleware, combineReducers } from 'redux';
import router from 'app/reducers/router';
import user from 'app/reducers/user';
import entities from 'app/reducers/entities';
import pagination from 'app/reducers/pagination';
import conversationStore from 'app/reducers/conversationStore';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'app/utils/apiMiddleware';

const reducer = combineReducers({
  router,
  user,
  entities,
  pagination,
});

const createStoreWithMiddleware = applyMiddleware(...[
  apiMiddleware,
  thunkMiddleware,
  DEBUG && require('redux-logger'),
].filter(Boolean))(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
