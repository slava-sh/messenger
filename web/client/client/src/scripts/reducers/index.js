import { combineReducers } from 'redux';
import router from 'app/reducers/router';
import newConversation from 'app/reducers/newConversation';
import entities from 'app/reducers/entities';
import pagination from 'app/reducers/pagination';
import users from 'app/reducers/users';

const reducer = combineReducers({
  router,
  newConversation,
  entities,
  pagination,
  users,
});

export default reducer;
