import { apiRequest } from 'app/utils';

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

export function receiveMessages({ conversationId, messages }) {
  return {
    type: 'RECEIVE_MESSAGES',
    payload: { conversationId, messages },
  };
}

export function requestMessages(conversationId) {
  return dispatch => {
    dispatch({ type: 'REQUEST_MESSAGES' });
    apiRequest(`/react/conversations/${conversationId}/messages`)
      .then(data => dispatch(receiveMessages({
        conversationId,
        messages: data,
      })));
  };
}

export function selectConversation(conversationId) {
  return (dispatch, getState) => {
    if (conversationId === getState().conversationStore.currentConversationId) {
      return;
    }
    dispatch({
      type: 'SELECT_CONVERSATION',
      payload: { conversationId },
    });
    dispatch(requestMessages(conversationId));
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
    })
      .then(data => dispatch({
        type: 'SEND_MESSAGE_SUCCESS',
        payload: data,
      }));
  };
}
