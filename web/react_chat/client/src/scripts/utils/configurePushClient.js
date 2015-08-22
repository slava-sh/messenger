import { bindActionCreators } from 'redux';
import Primus from 'primus';
import { camelizeKeys } from 'humps';
import { receiveMessage, receiveTyping } from 'app/actions/conversation';

export function configurePushClient(primusUrl, store) {
  const actions = bindActionCreators({
    RECEIVE_MESSAGE: receiveMessage,
    RECEIVE_TYPING: receiveTyping,
  }, store.dispatch);

  const primus = Primus.connect(primusUrl, {
    reconnect: {
      retries: Infinity,
    },
  });

  primus.on('open', () => {
    primus.write({
      type: 'REGISTER',
      payload: { user_id: store.getState().user.id }, // TODO: use session cookie instead
    });
  });

  primus.on('data', data => {
    const { type, payload } = camelizeKeys(data);
    const action = actions[type];
    if (DEBUG && !action) {
      throw Error(`unknown action type: ${type}`);
    }
    action(payload);
  });
}

export default configurePushClient;
