import unique from 'lodash/array/uniq';
import without from 'lodash/array/without';
import { createEntityReducer } from 'app/utils/reducers';

function withTypingUserIds(fn) {
  return (state, action) => {
    const { conversationId, userId } = action.payload;
    const conversation = state[conversationId];
    if (!conversation) {
      return state;
    }
    return {
      ...state,
      [conversationId]: {
        ...conversation,
        typingUserIds: fn(conversation.typingUserIds || [], userId),
      },
    };
  };
}

const reducer = createEntityReducer('conversations', {

  START_TYPING: withTypingUserIds((typingUserIds, userId) => {
    return unique([userId, ...typingUserIds]);
  }),

  STOP_TYPING: withTypingUserIds((typingUserIds, userId) => {
    return without(typingUserIds, userId);
  }),
});

export default reducer;
