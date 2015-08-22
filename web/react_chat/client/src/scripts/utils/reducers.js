import get from 'lodash/object/get';
import merge from 'lodash/object/merge';

function handleAction(handlers, state, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return handleAction(handlers, state, action);
  }
}

export function createEntityReducer(name, handlers = {}) {
  return function reducer(state = {}, action) {
    const entities = get(action, ['response', 'entities', name]);
    const newState = entities ? merge({}, state, entities) : state;
    return handleAction(handlers, newState, action);
  }
}
