import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'app/utils/normalizer';
import cookie from 'app/utils/cookie';

const API_ROOT = '/api/';

export function executeApiCall([method, endpoint, responseSchema, data]) { // TODO: make this private
  return fetch(API_ROOT + endpoint, {
    method,
    credentials: 'same-origin',
    headers: {
      // TODO: remove String call when whatwg-fetch updates from 0.9.0, see
      // https://github.com/github/fetch/blob/v0.9.0/fetch.js#L20
      // https://github.com/github/fetch/blob/master/fetch.js#L20
      'X-CSRFToken': String(cookie.get('csrftoken')),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: typeof data === 'object' ? JSON.stringify(data) : data,
  }).then(response => response.json().then(camelizeKeys).then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return normalize(json, responseSchema);
  }));
}

export default executeApiCall;
