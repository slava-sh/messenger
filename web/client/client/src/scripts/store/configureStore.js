import { createStore, applyMiddleware } from 'redux';
import reducer from 'app/reducers';
import conditionMiddleware from 'app/middleware/condition';
import apiMiddleware from 'app/middleware/api';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(...[
  conditionMiddleware,
  apiMiddleware,
  thunkMiddleware,
  DEBUG && require('redux-logger'),
].filter(Boolean))(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
