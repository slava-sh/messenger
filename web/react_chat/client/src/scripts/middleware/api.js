import callApi from 'app/utils/api';

export const middleware = store => next => action => {
  if (!action.endpoint) {
    return next(action);
  }
  if (action.condition && !action.condition(store.getState())) {
    return Promise.resolve();
  }
  const { types, payload = {}, endpoint, schema } = action;
  const [requestType, successType, failureType] = types;
  next({
    type: requestType,
    payload,
  });
  return callApi(endpoint, schema).then(
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
