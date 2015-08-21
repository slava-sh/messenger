import * as Schemas from 'app/utils/apiSchemas';
import callApi from 'app/utils/api';

const TYPING_TIME = 10 * 1000;

export function loadConversations() {
  return {
    types: ['REQUEST_CONVERSATIONS', 'RECEIVE_CONVERSATIONS_SUCCESS', 'RECEIVE_CONVERSATIONS_FAILURE'],
    endpoint: 'conversations',
    schema: Schemas.conversations,
    condition: state => !state.pagination.conversations.default,
  };
}

export function loadConversation(conversationId) {
  return {
    types: ['REQUEST_CONVERSATION', 'RECEIVE_CONVERSATION_SUCCESS', 'RECEIVE_CONVERSATION_FAILURE'],
    payload: { conversationId },
    endpoint: `conversations/${conversationId}`,
    schema: Schemas.conversation,
    condition: state => !state.entities.conversations[conversationId],
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

export function sendMessage({ conversationId, text }) {
  return (dispatch, getState) => {
    const { user } = getState();
    const message = { author: user.name, text };
    dispatch({
      type: 'SEND_MESSAGE',
      payload: { conversationId, message },
    });
    callApi(`conversations/${conversationId}/messages`, null, {
      method: 'POST',
      headers: {
        'X-CSRFToken': user.csrfToken,
      },
      body: { text },
    });
  };
}

let shouldSendTyping = true; // TODO: reset when switching conversation
let shouldSendTypingTimeout = null;

export function sendTyping(conversationId) { // TODO: refactor
  return (dispatch, getState) => {
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
    const { user } = getState();
    callApi(`conversations/${conversationId}/typing`, null, {
      method: 'POST',
      headers: {
        'X-CSRFToken': user.csrfToken,
      },
    });
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
