import merge from 'lodash/object/merge';

const initialState = {
  users: {},
  conversations: {},
  messages: {},
};

function reducer(state = initialState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

export default reducer;
