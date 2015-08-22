import get from 'lodash/object/get';
import merge from 'lodash/object/merge';

function handleAction(handlers, state, action) {
  if (handlers && handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return handleAction(handlers, state, action);
  }
}

export function createKeyedReducer(mapActionToKey, keyReducer) {
  return function reducer(state = {}, action) {
    const key = mapActionToKey(action);
    if (!key) {
      return state;
    }
    if (DEBUG && typeof key !== 'string') {
      throw new TypeError('key should be a string');
    }
    return {
      ...state,
      [key]: keyReducer(state[key], action),
    };
  };
}

export function createEntityReducer(name, handlers) {
  return function reducer(state = {}, action) {
    const entities = get(action, ['response', 'entities', name]);
    const newState = entities ? merge({}, state, entities) : state;
    return handleAction(handlers, newState, action);
  }
}

export function createPaginationReducer(types, handlers) {
  const [requestType, successType, failureType] = types;
  const loadingState = {
    ids: [],
    isLoading: false,
    // TODO: nextCursor
  };
  const updatePagination = handleAction.bind(null, {
    [requestType]: (state, action) => {
      return {
        ...state,
        ...loadingState,
      };
    },
    [successType]: (state, action) => {
      return {
        ...state,
        ids: [...state.ids, ...action.response.result],
        isLoading: false,
      };
    },
    [failureType]: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  });
  return function reducer(state = null, action) {
    const newState = updatePagination(state, action);
    return handleAction(handlers, newState, action);
  };
}
