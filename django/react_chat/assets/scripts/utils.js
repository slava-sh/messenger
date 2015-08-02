import _ from 'lodash';
import got from 'got';

export function fetchApi(url, options) {
  options = _.assign({
    json: true,
  }, options);
  return got(url, options).then((response) => response.body);
}
