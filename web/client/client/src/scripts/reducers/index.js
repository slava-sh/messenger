import { combineReducers } from 'redux';
import router from 'app/reducers/router';
import newConversation from 'app/reducers/newConversation';
import entities from 'app/reducers/entities';
import pagination from 'app/reducers/pagination';
import users from 'app/reducers/users';
import messages from 'app/reducers/messages';

const reducer = combineReducers({
  router,
  newConversation,
  entities,
  pagination,
  users,
  messages,
});

export default reducer;
