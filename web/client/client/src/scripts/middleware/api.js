import execute from 'app/utils/executeApiCall';

export const middleware = store => next => action => {
  if (!action.callApi) {
    return next(action);
  }
  const {
    types: [REQUEST, SUCCESS, FAILURE],
    payload = {},
    callApi: call,
    getPagination,
  } = action;
  if (getPagination) {
    const pagination = getPagination(store.getState());
    if (pagination && pagination.nextCursor) {
      call[1] += '?cursor=' + pagination.nextCursor; // TODO: refactor
    }
  }
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
