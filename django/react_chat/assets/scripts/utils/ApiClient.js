import { bindActionCreators } from 'redux';
import * as actionCreators from 'app/actions/conversation';

export function sendMessage(conversationId, message) {
  window.socket.emit('SEND_MESSAGE', conversationId, message);
}

export function requestMessages(conversationId, callback) {
  window.socket.emit('REQUEST_MESSAGES', conversationId, callback);
}

export function bindActions(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  window.socket.on('RECEIVE_MESSAGE', actions.receiveMessage);
}
