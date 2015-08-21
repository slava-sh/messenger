import { Schema, paginated, normalize } from 'app/utils/normalizr';
import { camelizeKeys } from 'humps';
import fetch from 'isomorphic-fetch';

const API_ROOT = '/react/'; // TODO

const conversationSchema = new Schema('conversations');
const messageSchema = new Schema('messages');

export const Schemas = {
  conversation: conversationSchema,
  conversations: paginated(conversationSchema),
  message: messageSchema,
  messages: paginated(messageSchema),
};

function callApi(endpoint, schema) {
  if (!endpoint.startsWith(API_ROOT)) {
    endpoint = API_ROOT + endpoint;
  }
  return fetch(endpoint, {
    credentials: 'same-origin',
  })
  .then(response => response.json().then(json => ({ json: camelizeKeys(json), response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const links = json.links || {};
    const nextPageUrl = links.next;
    return Object.assign({},
      normalize(json, schema),
      { nextPageUrl },
    );
  });
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
