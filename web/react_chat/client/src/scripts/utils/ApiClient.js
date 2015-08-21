import { bindActionCreators } from 'redux';
import { camelizeKeys } from 'humps';
import * as actionCreators from 'app/actions/conversation';

var primus;

export function sendMessage(conversationId, message) {
  // primus.write({ type: 'SEND_MESSAGE', conversationId, message });
}

export function requestMessages(conversationId, callback) {
  // primus.write(['REQUEST_MESSAGES', conversationId]);
}

export function initialize(primusUrl, store) {
  const actions = bindActionCreators(actionCreators, store.dispatch);

  primus = Primus.connect(primusUrl, {
    reconnect: {
      retries: Infinity,
    },
  });

  primus.on('open', function() {
    primus.write({
      type: 'REGISTER',
      payload: { user_id: store.getState().user.id },
    });
  });

  primus.on('data', function(data) {
    const { type, payload } = camelizeKeys(data);
    if (type === 'RECEIVE_MESSAGE') {
      actions.receiveMessage(payload);
    }
    else if (type === 'RECEIVE_TYPING') {
      actions.receiveTyping(payload);
    }
  });

  primus.on('error', function(err) {
    console.log('error', err.stack);
  });
}

export default initialize;
