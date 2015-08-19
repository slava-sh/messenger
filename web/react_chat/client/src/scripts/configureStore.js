import { createStore, applyMiddleware, combineReducers } from 'redux';
import router from 'app/reducers/router';
import user from 'app/reducers/user';
import conversationStore from 'app/reducers/conversationStore';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  router,
  user,
  conversationStore,
});

const createStoreWithMiddleware = applyMiddleware(
  thunk,
)(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
