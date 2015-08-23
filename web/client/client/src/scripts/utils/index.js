import findIndex from 'lodash/array/findIndex';

export function intersperse(items, separator) {
  if (items.length === 0) {
    return [];
  }
  return items.slice(1).reduce((acc, item) => {
    return acc.concat([separator, item]);
  }, [items[0]]);
}

export function moveItemToFront(items, predicate) {
  const index = findIndex(items, predicate);
  if (index === -1) {
    return items;
  }
  return [
    items[index],
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
}
