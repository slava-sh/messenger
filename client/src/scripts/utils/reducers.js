import get from 'lodash/object/get';
import merge from 'lodash/object/merge';
import { stripPagination, getCursor } from 'app/utils/apiPagination';

function handleAction(handlers, state, action) {
  if (handlers && handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return handleAction(handlers, state, action);
  };
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
    const entities = stripPagination(get(action, ['response', 'entities', name]));
    const newState = entities ? merge({}, state, entities) : state;
    return handleAction(handlers, newState, action);
  };
}

export const initialPaginationState = {
  ids: null,
  nextCursor: null,
  isLoading: false,
};

export function createPaginationReducer(types, handlers) {
  const [REQUEST, SUCCESS, FAILURE] = types;
  const updatePagination = handleAction.bind(null, {
    [REQUEST]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [SUCCESS]: (state, action) => {
      return {
        ...state,
        ids: [...(state.ids || []), ...stripPagination(action.response.result)],
        nextCursor: getCursor(action.response.result),
        isLoading: false,
      };
    },
    [FAILURE]: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  });
  return function reducer(state = initialPaginationState, action) {
    const newState = updatePagination(state, action);
    return handleAction(handlers, newState, action);
  };
}

export const initialSingletonState = {
  id: null,
  isLoading: false,
};

export function createSingletonReducer(types, handlers) {
  const [REQUEST, SUCCESS, FAILURE] = types;
  const updateState = handleAction.bind(null, {
    [REQUEST]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [SUCCESS]: (state, action) => {
      return {
        ...state,
        id: action.response.result,
        isLoading: false,
      };
    },
    [FAILURE]: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  });
  return function reducer(state = initialSingletonState, action) {
    const newState = updateState(state, action);
    return handleAction(handlers, newState, action);
  };
}
