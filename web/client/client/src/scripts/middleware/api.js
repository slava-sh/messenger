import execute from 'app/utils/executeApiCall';

export const middleware = store => next => action => {
  if (!action.callApi) {
    return next(action);
  }
  const {
    types: [REQUEST, SUCCESS, FAILURE],
    payload = {},
    callApi: call,
  } = action;
  store.dispatch({
    type: REQUEST,
    payload,
  });
  return execute(call).then(
    response => store.dispatch({
      type: SUCCESS,
      response,
      payload,
    }),
    error => store.dispatch({
      type: FAILURE,
      error: error.message,
      payload,
    }),
  );
};

export default middleware;
