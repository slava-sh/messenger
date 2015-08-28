import * as api from 'app/utils/apiCallCreators';
import * as ActionTypes from 'app/ActionTypes';

export function sendCode(email) {
  return {
    types: [
      ActionTypes.SEND_CODE,
      ActionTypes.SEND_CODE_SUCCESS,
      ActionTypes.SEND_CODE_FAILURE,
    ],
    callApi: api.sendCode(email),
  };
}
