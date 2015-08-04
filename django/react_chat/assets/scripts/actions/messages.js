import { fetchApi } from 'app/utils';

export function requestMessages(conversationId) {
  return dispatch => {
    dispatch({
      type: 'REQUEST_MESSAGES'
    });
    fetchApi(`/react/conversations/${conversationId}/messages`)
      .then((data) => dispatch(receiveMessages({
        conversationId,
        messages: data,
      })));
  }
}

export function receiveMessages({ conversationId, messages }) {
  return dispatch => {
    dispatch({
      type: 'RECEIVE_MESSAGES',
      payload: { conversationId, messages }
    });
  };
}
