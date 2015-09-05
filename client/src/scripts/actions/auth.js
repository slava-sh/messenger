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

export function loadUser(userId = 'me') {
  return {
    types: [
      ActionTypes.REQUEST_CURRENT_USER,
      ActionTypes.RECEIVE_CURRENT_USER,
      ActionTypes.RECEIVE_CURRENT_USER_FAILURE,
    ],
    callApi: api.getUser(userId),
    condition: state => {
      return !state.users.current.isLoading;
    },
  };
}

export function loadUsers() {
  return {
    types: [
      ActionTypes.REQUEST_USERS,
      ActionTypes.RECEIVE_USERS,
      ActionTypes.FAILURE_USERS,
    ],
    callApi: api.getUsers(),
    condition: state => {
      return !state.users.all.isLoading;
    },
  };
}
