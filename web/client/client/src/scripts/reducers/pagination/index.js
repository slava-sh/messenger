import { combineReducers } from 'redux';
import conversations from 'app/reducers/pagination/conversations';

const reducer = combineReducers({
  conversations,
});

export default reducer;
