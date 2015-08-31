import { combineReducers } from 'redux';
import router from 'app/reducers/router';
import newConversation from 'app/reducers/newConversation';
import users from 'app/reducers/users';
import conversations from 'app/reducers/conversations';
import messages from 'app/reducers/messages';

const reducer = combineReducers({
  router,
  newConversation,
  users,
  conversations,
  messages,
});

export default reducer;
