import { combineReducers } from 'redux';
import { createEntityReducer } from 'app/utils/reducers';
import byConversation from 'app/reducers/messages/byConversation';

const reducer = combineReducers({
  byId: createEntityReducer('messages'),
  byConversation,
});

export default reducer;
