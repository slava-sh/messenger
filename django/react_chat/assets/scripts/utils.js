import assign from 'object-assign';
import 'whatwg-fetch';

export function fetchApi(url, options) {
  options = assign({
    credentials: 'same-origin',
  }, options);
  return fetch(url, options)
    .then((response) => {
      if (200 <= response.status && response.status < 300) {
        return response.json()
      }
      let error = new Error(response.statusText)
      error.response = response
      throw error
    });
}
