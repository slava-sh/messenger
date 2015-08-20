import { createStore, applyMiddleware, combineReducers } from 'redux';
import router from 'app/reducers/router';
import user from 'app/reducers/user';
import conversationStore from 'app/reducers/conversationStore';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

const reducer = combineReducers({
  router,
  user,
  conversationStore,
});

const createStoreWithMiddleware = applyMiddleware(...[
  thunkMiddleware,
  DEBUG && loggerMiddleware,
].filter(Boolean))(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
