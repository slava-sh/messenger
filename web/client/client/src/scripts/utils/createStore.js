import { createStore as baseCreateStore, applyMiddleware } from 'redux';
import reducer from 'app/reducers';
import conditionMiddleware from 'app/middleware/condition';
import apiMiddleware from 'app/middleware/api';
import thunkMiddleware from 'redux-thunk';

const middleware = [
  conditionMiddleware,
  apiMiddleware,
  thunkMiddleware,
  DEBUG && require('redux-logger')({ collapsed: true }),
].filter(Boolean);

export function createStore(initialState) {
  return applyMiddleware(...middleware)(baseCreateStore)(reducer, initialState);
}

export default createStore;
