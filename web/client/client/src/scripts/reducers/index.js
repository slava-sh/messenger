import { combineReducers } from 'redux';
import router from 'app/reducers/router';
import userId from 'app/reducers/userId';
import newConversation from 'app/reducers/newConversation';
import entities from 'app/reducers/entities';
import pagination from 'app/reducers/pagination';

const reducer = combineReducers({
  router,
  userId,
  newConversation,
  entities,
  pagination,
});

export default reducer;
