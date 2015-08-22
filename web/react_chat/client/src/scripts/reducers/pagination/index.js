import { combineReducers } from 'redux';
import conversations from 'app/reducers/pagination/conversations';
import messagesByConversation from 'app/reducers/pagination/messagesByConversation';

const reducer = combineReducers({
  conversations,
  messagesByConversation,
});

export default reducer;
