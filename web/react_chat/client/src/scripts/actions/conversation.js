import * as Schemas from 'app/utils/apiSchemas';
import callApi from 'app/utils/callApi';

const TYPING_TIME = 10 * 1000;

export function loadConversations() {
  return {
    types: ['REQUEST_CONVERSATIONS', 'RECEIVE_CONVERSATIONS_SUCCESS', 'RECEIVE_CONVERSATIONS_FAILURE'],
    endpoint: 'conversations',
    schema: Schemas.conversations,
    condition: state => !state.pagination.conversations,
  };
}

export function loadConversation(conversationId) {
  return {
    types: ['REQUEST_CONVERSATION', 'RECEIVE_CONVERSATION_SUCCESS', 'RECEIVE_CONVERSATION_FAILURE'],
    payload: { conversationId },
    endpoint: `conversations/${conversationId}`,
    schema: Schemas.conversation,
    condition: state => {
      const conversation = state.entities.conversations[conversationId];
      return !conversation || !conversation.members || !conversation.messages;
    },
  };
}

export function loadMessages(conversationId) {
  return {
    types: ['REQUEST_MESSAGES', 'RECEIVE_MESSAGES_SUCCESS', 'RECEIVE_MESSAGES_FAILURE'],
    payload: { conversationId },
    endpoint: `conversations/${conversationId}/messages`,
    schema: Schemas.messages,
    condition: state => !state.pagination.messagesByConversation[conversationId],
  };
}

export function receiveMessage({ conversationId, message }) {
  return {
    type: 'RECEIVE_MESSAGE',
    payload: { conversationId, message },
  };
}

export function sendMessage({ conversationId, text }) {
  return (dispatch, getState) => {
    const { user } = getState();
    const message = { author: user.name, text };
    dispatch({
      type: 'SEND_MESSAGE',
      payload: { conversationId, message },
    });
    callApi('POST', `conversations/${conversationId}/messages`, { text });
  };
}

let shouldSendTyping = true; // TODO: reset when switching conversation
let shouldSendTypingTimeout = null;

export function sendTyping(conversationId) { // TODO: refactor
  return dispatch => {
    if (!shouldSendTyping) {
      return;
    }
    shouldSendTyping = false;
    clearTimeout(shouldSendTypingTimeout);
    shouldSendTypingTimeout = setTimeout(() => {
      shouldSendTyping = true;
    }, TYPING_TIME);

    dispatch({
      type: 'SEND_TYPING',
      payload: { conversationId },
    });
    callApi('POST', `conversations/${conversationId}/typing`);
  };
}

let stopTypingTimeout = null;

export function receiveTyping({ conversationId, userId }) {
  return dispatch => {
    dispatch({
      type: 'START_TYPING',
      payload: { conversationId, userId },
    });
    clearTimeout(stopTypingTimeout);
    stopTypingTimeout = setTimeout(() => {
      dispatch({
        type: 'STOP_TYPING',
        payload: { conversationId, userId },
      });
    }, TYPING_TIME);
  };
}
