import { fetchApi } from 'app/utils';

export function requestConversations() {
  return dispatch => {
    dispatch({
      type: 'REQUEST_CONVERSATIONS'
    });
    fetchApi('/react/conversations')
      .then((data) => dispatch(receiveConversations(data)))
      .catch((error) => {
        console.log('request failed', error);
      });
  }
}

export function receiveConversations(conversations) {
  return dispatch => {
    dispatch({
      type: 'RECEIVE_CONVERSATIONS',
      payload: conversations
    });
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
