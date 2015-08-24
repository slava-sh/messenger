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
      'X-CSRFToken': cookie.get('csrftoken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: typeof data === 'object' ? JSON.stringify(data) : data,
  }).then(response => response.json().then(camelizeKeys).then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const nextCursor = json.next ? /cursor=(.+)$/.exec(json.next)[1] : null;
    return {
      ...normalize(json, responseSchema),
      nextCursor,
    };
  }));
}

export default executeApiCall;
