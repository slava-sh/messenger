import socketClient from 'socket.io-client';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'app/actions/conversation';

let socket;

export function sendMessage(conversationId, message) {
  socket.emit('SEND_MESSAGE', conversationId, message);
}

export function requestMessages(conversationId, callback) {
  socket.emit('REQUEST_MESSAGES', conversationId, callback);
}

export function bindActions(socketUrl, id, dispatch) {
  socket = socketClient(socketUrl);
  const actions = bindActionCreators(actionCreators, dispatch);
  socket.on('connect', function() {
    console.log('connected', arguments);
    socket.emit('register', id);
  });
  socket.on('disconnect', function() {
    console.log('disconnected', arguments);
  });
  socket.on('message', function(payload) {
    console.log('got', arguments);
    const { conversation_id: conversationId, message } = payload;
    actions.receiveMessage({ conversationId, message });
  });
}
