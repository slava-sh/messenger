import { combineReducers } from 'redux';
import conversations from 'app/reducers/entities/conversations';
import messages from 'app/reducers/entities/messages';
import users from 'app/reducers/entities/users';

const reducer = combineReducers({
  conversations,
  messages,
  users,
});

export default reducer;
