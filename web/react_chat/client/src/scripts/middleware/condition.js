export const middleware = store => next => action => {
  if (!action.condition || action.condition(store.getState())) {
    return next(action);
  }
};

export default middleware;
