import { bindActionCreators } from 'redux';
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
    // console.log('connected');
    primus.write({
      type: 'REGISTER',
      payload: { user_id: store.getState().user.id },
    });
  });

  primus.on('data', function(data) {
    console.log('got', data);
    if (data.type === 'RECEIVE_MESSAGE') {
      const { conversation_id: conversationId, message } = data.payload;
      actions.receiveMessage({ conversationId, message });
    }
    else if (data.type === 'RECEIVE_TYPING') {
      const {
        conversation_id: conversationId,
        user_id: userId,
      } = data.payload;
      actions.receiveTyping(conversationId, userId);
    }
  });

  primus.on('error', function(err) {
    console.log('error', err.stack);
  });
}

export default initialize;
