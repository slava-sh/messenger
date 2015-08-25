import { bindActionCreators } from 'redux';
import Primus from 'primus';
import { camelizeKeys } from 'humps';
import { receiveMessage, receiveTyping } from 'app/actions/conversation';
import * as ActionTypes from 'app/ActionTypes';

export function createPushClient(primusUrl, store) {
  const actions = bindActionCreators({
    [ActionTypes.RECEIVE_MESSAGE]: receiveMessage,
    [ActionTypes.RECEIVE_TYPING]: receiveTyping,
  }, store.dispatch);

  const primus = Primus.connect(primusUrl, {
    reconnect: {
      retries: Infinity,
    },
  });

  primus.on('open', () => {
    primus.write({
      type: ActionTypes.REGISTER,
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

  return {
    destroy: () => primus.destroy(),
  };
}

export default createPushClient;
