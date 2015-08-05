import assign from 'lodash/object/assign';
import got from 'got';

export function apiRequest(url, options) {
  options = assign({
    json: true
  }, options);
  return got(url, options).then(response => response.body);
}
