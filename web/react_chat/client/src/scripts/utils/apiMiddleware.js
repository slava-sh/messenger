import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'app/utils/normalizr';

const API_ROOT = '/react/'; // TODO

function callApi(endpoint, responseSchema) {
  if (!endpoint.startsWith(API_ROOT)) {
    endpoint = API_ROOT + endpoint;
  }
  return fetch(endpoint, {
    credentials: 'same-origin',
  }).then(response => response.json().then(camelizeKeys).then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const links = json.links || {};
    const nextPageUrl = links.next;
    return Object.assign({},
      normalize(json, responseSchema),
      { nextPageUrl },
    );
  }));
}

export const CALL_API = Symbol('Call API');

export const middleware = store => next => action => {
  const params = action[CALL_API];
  if (!params) {
    return next(action);
  }

  const { endpoint, schema, types } = params;
  const [requestType, successType, failureType] = types;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      type: successType,
      response,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message,
    }))
  );
};

export default middleware;
