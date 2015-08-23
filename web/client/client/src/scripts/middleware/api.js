import execute from 'app/utils/executeApiCall';

export const middleware = () => next => action => {
  if (!action.callApi) {
    return next(action);
  }
  const {
    types: [REQUEST, SUCCESS, FAILURE],
    payload = {},
    callApi: call,
  } = action;
  next({
    type: REQUEST,
    payload,
  });
  return execute(call).then(
    response => next({
      type: SUCCESS,
      response,
      payload,
    }),
    error => next({
      type: FAILURE,
      error: error.message,
      payload,
    }),
  );
};

export default middleware;
