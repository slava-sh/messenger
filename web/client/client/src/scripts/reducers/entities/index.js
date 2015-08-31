import { combineReducers } from 'redux';
import conversations from 'app/reducers/entities/conversations';

const reducer = combineReducers({
  conversations,
});

export default reducer;
