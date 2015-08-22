import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from 'app/reducers';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'app/utils/apiMiddleware';

const createStoreWithMiddleware = applyMiddleware(...[
  apiMiddleware,
  thunkMiddleware,
  DEBUG && require('redux-logger'),
].filter(Boolean))(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
