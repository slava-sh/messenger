import assign from 'lodash/object/assign';
import got from 'got';

export function apiRequest(url, options) {
  const finalOptions = assign({
    json: true,
  }, options);
  return got(url, finalOptions).then(response => response.body);
}

export function intersperse(items, separator) {
  if (items.length === 0) {
    return [];
  }
  return items.slice(1).reduce((acc, item) => {
    return acc.concat([separator, item]);
  }, [items[0]]);
}
