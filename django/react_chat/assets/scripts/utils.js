import assign from 'object-assign';
import got from 'got';

export function fetchApi(url, options) {
  options = assign({
    json: true,
  }, options);
  return got(url, options).then((response) => response.body);
}
