import merge from 'lodash/object/merge';
import unique from 'lodash/array/uniq';
import without from 'lodash/array/without';

const initialState = {
  users: {},
  conversations: {},
  messages: {},
};

function reducer(state = initialState, action) {
  if (action.type === 'START_TYPING' || action.type === 'STOP_TYPING') {
    const { conversationId, userId } = action.payload;
    const conversation = state.conversations[conversationId];
    if (!conversation) {
      return state;
    }
    let typingUserIds = conversation.typingUserIds || [];
    if (action.type === 'START_TYPING') {
      typingUserIds = unique([userId, ...typingUserIds]);
    }
    else if (action.type === 'STOP_TYPING') {
      typingUserIds = without(typingUserIds, userId);
    }
    return {
      ...state,
      conversations: {
        ...state.conversations,
        [conversationId]: {
          ...conversation,
          typingUserIds,
        },
      },
    }
  }
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

export default reducer;
