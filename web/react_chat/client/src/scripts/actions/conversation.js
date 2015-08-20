import { apiRequest } from 'app/utils';
import * as ApiClient from 'app/utils/ApiClient';
import { Schemas, CALL_API } from 'app/api';

const TYPING_TIME = 10 * 1000;

export function loadConversations() {
  return {
    [CALL_API]: {
      types: ['REQUEST_CONVERSATIONS', 'RECEIVE_CONVERSATIONS_SUCCESS', 'RECEIVE_CONVERSATIONS_FAILURE'],
      endpoint: 'conversations',
      schema: Schemas.conversations,
    },
  };
}

export function receiveConversations(conversations) {
  return {
    type: 'RECEIVE_CONVERSATIONS',
    payload: { conversations },
  };
}

export function requestConversations() {
  return dispatch => {
    dispatch({ type: 'REQUEST_CONVERSATIONS' });
    apiRequest('/react/conversations')
      .then(data => dispatch(receiveConversations(data)));
  };
}

export function receiveMessages({ conversationId, messages }) { // TODO: refactor
  return {
    type: 'RECEIVE_MESSAGES',
    payload: { conversationId, messages },
  };
}

export function receiveMessage({ conversationId, message }) { // TODO: refactor
  return {
    type: 'RECEIVE_MESSAGE',
    payload: { conversationId, message },
  };
}

export function receiveTyping(conversationId, userId) {
  return (dispatch, getState) => {
    dispatch({
      type: 'START_TYPING',
      payload: { conversationId, userId },
    });
    setTimeout(() => {
      dispatch({
        type: 'STOP_TYPING',
        payload: { conversationId, userId },
      });
    }, TYPING_TIME);
  };
}

export function requestMessages(conversationId) {
  return dispatch => {
    dispatch({ type: 'REQUEST_MESSAGES' });
    ApiClient.requestMessages(conversationId, function() {console.log('got', arguments)}); // eslint-disable-line
    apiRequest(`/react/conversations/${conversationId}/messages`)
      .then(data => dispatch(receiveMessages({
        conversationId,
        messages: data,
      })));
  };
}

export function loadMessages(conversationId) {
  return (dispatch, getState) => {
    dispatch(requestMessages(conversationId));
  };
}

export function loadConversation(conversationId) {
  return (dispatch, getState) => {
    //dispatch({
    //  type: 'SELECT_CONVERSATION',
    //  payload: { conversationId },
    //});
    //dispatch(requestCon(conversationId));
  };
}

export function sendMessage(text) {
  return (dispatch, getState) => {
    const { user, conversationStore } = getState();
    const conversationId = conversationStore.currentConversationId;
    const message = { author: user.name, text };
    dispatch({
      type: 'SEND_MESSAGE',
      payload: { conversationId, message },
    });
    apiRequest(`/react/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': user.csrfToken,
      },
      body: { text },
    });
  };
}

let shouldSendTyping = true; // TODO: reset when changing conversation

export function sendTyping() { // TODO: refactor
  return (dispatch, getState) => {
    if (!shouldSendTyping) {
      return;
    }
    shouldSendTyping = false;
    setTimeout(() => {
      shouldSendTyping = true;
    }, TYPING_TIME);

    const { user, conversationStore } = getState();
    const conversationId = conversationStore.currentConversationId;
    dispatch({
      type: 'SEND_TYPING',
      payload: { conversationId },
    });
    apiRequest(`/react/conversations/${conversationId}/typing`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': user.csrfToken,
      },
    });
  };
}
