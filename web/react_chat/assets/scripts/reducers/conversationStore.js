import { handleActions } from 'redux-actions';

const initialState = {
  entries: null,
  currentConversationId: null,
  currentMessages: null,
};

const reducer = handleActions({

  RECEIVE_CONVERSATIONS: (state, action) => {
    return {
      ...state,
      entries: action.payload.conversations,
    };
  },

  SELECT_CONVERSATION: (state, action) => {
    if (action.payload.conversationId === state.currentConversationId) {
      return state;
    }
    return {
      ...state,
      currentConversationId: action.payload.conversationId,
    };
  },

  REQUEST_MESSAGES: (state) => {
    return {
      ...state,
      currentMessages: null,
    };
  },

  RECEIVE_MESSAGES: (state, action) => {
    if (action.payload.conversationId !== state.currentConversationId) {
      return state;
    }
    return {
      ...state,
      currentMessages: action.payload.messages,
    };
  },

  RECEIVE_MESSAGE: (state, action) => {
    if (action.payload.conversationId !== state.currentConversationId) {
      return state;
    }
    return {
      ...state,
      currentMessages: [...state.currentMessages, action.payload.message],
    };
  },
}, initialState);

export default reducer;
