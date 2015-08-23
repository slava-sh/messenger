import callApi from 'app/utils/callApi';

export const middleware = () => next => action => {
  if (!action.endpoint) {
    return next(action);
  }
  const { types, payload = {}, method = 'GET', endpoint, data, schema } = action;
  const [requestType, successType, failureType] = types;
  next({
    type: requestType,
    payload,
  });
  return callApi(method, endpoint, data, schema).then(
    response => next({
      type: successType,
      response,
      payload,
    }),
    error => next({
      type: failureType,
      error: error.message,
      payload,
    }),
  );
};

export default middleware;
