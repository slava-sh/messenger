import { createEntityReducer } from 'app/utils/reducers';
import * as ActionTypes from 'app/ActionTypes';

const reducer = createEntityReducer('messages');

export default reducer;
