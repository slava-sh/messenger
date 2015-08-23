import callApi from 'app/utils/callApi';

export const middleware = () => next => action => {
  if (!action.endpoint) {
    return next(action);
  }
  const {
    types: [REQUEST, SUCCESS, FAILURE],
    payload = {},
    method = 'GET',
    endpoint,
    data,
    schema,
  } = action;
  next({
    type: REQUEST,
    payload,
  });
  return callApi(method, endpoint, data, schema).then(
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
