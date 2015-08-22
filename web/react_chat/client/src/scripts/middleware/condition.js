import callApi from 'app/utils/api';

export const middleware = store => next => action => {
  if (action.condition && !action.condition(store.getState())) {
    return;
  }
  return next(action);
};

export default middleware;
