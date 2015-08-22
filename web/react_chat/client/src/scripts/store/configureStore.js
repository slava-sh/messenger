import { createStore, applyMiddleware } from 'redux';
import reducer from 'app/reducers';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'app/middleware/api';

const createStoreWithMiddleware = applyMiddleware(...[
  apiMiddleware,
  thunkMiddleware,
  DEBUG && require('redux-logger'),
].filter(Boolean))(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
