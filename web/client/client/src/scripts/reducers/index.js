import { combineReducers } from 'redux';
import router from 'app/reducers/router';
import userId from 'app/reducers/userId';
import entities from 'app/reducers/entities';
import pagination from 'app/reducers/pagination';

const reducer = combineReducers({
  router,
  userId,
  entities,
  pagination,
});

export default reducer;
