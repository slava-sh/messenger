import assign from 'lodash/object/assign';
import got from 'got';

export function apiRequest(url, options) {
  const finalOptions = assign({
    json: true,
  }, options);
  return got(url, finalOptions).then(response => response.body);
}
