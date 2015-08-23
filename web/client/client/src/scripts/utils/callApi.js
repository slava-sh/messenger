import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'app/utils/normalizer';
import cookie from 'app/utils/cookie';

const API_ROOT = '/api/';

export function callApi(method, endpoint, data, responseSchema) {
  return fetch(API_ROOT + endpoint, {
    method,
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': cookie.get('csrftoken'),
    },
    body: typeof data === 'object' ? JSON.stringify(data) : data,
  }).then(response => response.json().then(camelizeKeys).then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return normalize(json, responseSchema);
  }));
}

export default callApi;
