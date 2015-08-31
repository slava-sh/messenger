import { combineReducers } from 'redux';
import conversations from 'app/reducers/entities/conversations';
import messages from 'app/reducers/entities/messages';

const reducer = combineReducers({
  conversations,
  messages,
});

export default reducer;
