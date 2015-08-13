import SockJS from 'sockjs-client';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'app/actions/conversation';

var sock;

export function sendMessage(conversationId, message) {
  //sock.emit('SEND_MESSAGE', conversationId, message);
  sock.send('SEND_MESSAGE');
}

export function requestMessages(conversationId, callback) {
  //sock.emit('REQUEST_MESSAGES', conversationId, callback);
}

export function bindActions(url, id, dispatch) {
  sock = new SockJS(url);
  sock.onopen = function() {
    console.log('open');
    sock.send({q:'w',e:'r',t:'y'});
  };
  sock.onmessage = function(event) {
    console.log('message', event.data);
    console.log(event);
  };
  sock.onclose = function() {
    console.log('close');
  };
  //sock.close();
  //socket = socketClient(socketUrl);
  //const actions = bindActionCreators(actionCreators, dispatch);
  //socket.on('connect', function() {
  //  console.log('connected', arguments);
  //  socket.emit('register', id);
  //});
  //socket.on('disconnect', function() {
  //  console.log('disconnected', arguments);
  //});
  //socket.on('message', function(payload) {
  //  console.log('got', arguments);
  //  const { conversation_id: conversationId, message } = payload;
  //  actions.receiveMessage({ conversationId, message });
  //});
}
