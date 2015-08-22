import { combineReducers } from 'redux';
import router from 'app/reducers/router';
import user from 'app/reducers/user';
import entities from 'app/reducers/entities';
import pagination from 'app/reducers/pagination';

const reducer = combineReducers({
  router,
  user,
  entities,
  pagination,
});

export default reducer;
