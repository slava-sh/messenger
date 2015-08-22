import { bindActionCreators } from 'redux';
import Primus from 'primus';
import { camelizeKeys } from 'humps';
import { receiveMessage, receiveTyping } from 'app/actions/conversation';

export function configurePushClient(primusUrl, store) {

  const actions = bindActionCreators({
    receiveMessage,
    receiveTyping,
  }, store.dispatch);

  const primus = Primus.connect(primusUrl, {
    reconnect: {
      retries: Infinity,
    },
  });

  primus.on('open', function() {
    primus.write({
      type: 'REGISTER',
      payload: { user_id: store.getState().user.id }, // TODO: use session cookie instead
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
}

export default configurePushClient;
