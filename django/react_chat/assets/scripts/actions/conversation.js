import { apiRequest } from 'app/utils';

export function requestConversations() {
  return dispatch => {
    dispatch({ type: 'REQUEST_CONVERSATIONS' });
    apiRequest('/react/conversations')
      .then(data => dispatch(receiveConversations(data)));
  }
}

export function receiveConversations(conversations) {
  return {
    type: 'RECEIVE_CONVERSATIONS',
    payload: { conversations }
  };
}

export function selectConversation(conversationId) {
  return (dispatch, getState) => {
    if (conversationId === getState().conversationStore.currentConversationId) {
      return;
    }
    dispatch({
      type: 'SELECT_CONVERSATION',
      payload: { conversationId }
    });
    dispatch(requestMessages(conversationId));
  };
}

export function requestMessages(conversationId) {
  return dispatch => {
    dispatch({ type: 'REQUEST_MESSAGES' });
    apiRequest(`/react/conversations/${conversationId}/messages`)
      .then(data => dispatch(receiveMessages({
        conversationId,
        messages: data
      })));
  }
}

export function receiveMessages({ conversationId, messages }) {
  return {
    type: 'RECEIVE_MESSAGES',
    payload: { conversationId, messages }
  };
}

//  requestConversation(id) {
//    this.dispatch();
//    fetchApi(`/react/conversations/${id}`)
//      .then((data) => this.actions.receiveConversation(data));
//  }
//
//  receiveConversation(conversation) {
//    this.dispatch(conversation);
//  }
