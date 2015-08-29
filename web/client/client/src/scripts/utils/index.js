import findIndex from 'lodash/array/findIndex';

export function intersperse(items, separator) {
  if (items.length === 0) {
    return [];
  }
  return items.slice(1).reduce((acc, item) => {
    return acc.concat([separator, item]);
  }, [items[0]]);
}
