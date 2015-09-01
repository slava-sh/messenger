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

export function updateProfile({ userId, data }) {
  return {
    types: [
      ActionTypes.UPDATE_PROFILE,
      ActionTypes.UPDATE_PROFILE_SUCCESS,
      ActionTypes.UPDATE_PROFILE_FAILURE,
    ],
    callApi: api.updateProfile({ userId, data }),
  };
}
