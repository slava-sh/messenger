import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'app/utils/normalizr';

const API_ROOT = '/react/'; // TODO

export function callApi(endpoint, responseSchema, requestOptions = {}) {
  if (!endpoint.startsWith(API_ROOT)) {
    endpoint = API_ROOT + endpoint;
  }
  const { body } = requestOptions;
  const serializedBody = typeof body === 'object' ? JSON.stringify(body) : body;
  return fetch(endpoint, {
    credentials: 'same-origin',
    ...requestOptions,
    body: serializedBody,
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

export default callApi;
