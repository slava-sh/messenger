import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'app/utils/normalizr';
import cookie from 'app/utils/cookie';

const API_ROOT = '/react/'; // TODO

export function callApi(endpoint, responseSchema, requestOptions = {}) {
  if (!endpoint.startsWith(API_ROOT)) {
    endpoint = API_ROOT + endpoint;
  }
  if (typeof requestOptions.credentials === 'undefined') {
    requestOptions.credentials = 'same-origin';
  }
  if (typeof requestOptions.headers === 'undefined') {
    requestOptions.headers = {};
  }
  requestOptions.headers['X-CSRFToken'] = cookie.get('csrftoken');
  if (typeof requestOptions.body === 'object') {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  return fetch(endpoint, requestOptions)
  .then(response => response.json().then(camelizeKeys).then(json => {
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
