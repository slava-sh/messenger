import pick from 'lodash/object/pick';
import mapValues from 'lodash/object/mapValues';
import flatten from 'lodash/array/flatten';

export function identity(x) {
  return x;
}

export function expand(collection, expanders) {
  return mapValues(expanders, (expandItem, paginationKey) => {
    const pagination = collection[paginationKey];
    const ids = pagination.ids || [];
    const items = ids.map(id => {
      const item = collection.byId[id];
      return item && expandItem ? expandItem(item) : item;
    }).filter(Boolean);
    return {
      ...pagination,
      items,
    };
  });
}

export function withLoaders(collection, loaders) {
  return mapValues(collection, (pagination, paginationKey) => {
    const loader = loaders[paginationKey];
    if (!loader) {
      return value;
    }
    return {
      ...pagination,
      loadMore: loader,
    };
  });
}

export function items(collection, paginationKey = 'all') {
//  if (!collection[paginationKey]) {
//    return [];
//  }
  return collection[paginationKey].items || [];
}

export function loadMore(collection, paginationKey = 'all') {
  return collection[paginationKey].loadMore();
}

export function isLoaded(collection, paginationKey = 'all') {
//  collection && collection[paginationKey]
  return Boolean(collection[paginationKey].ids);
}

export function isLoading(collection, paginationKey = 'all') {
  return collection[paginationKey].isLoading;
}

export function hasMore(collection, paginationKey = 'all') {
  if (!collection[paginationKey].loadMore) {
    return false;
  }
  if (!isLoaded(collection, paginationKey)) {
    return true;
  }
  return Boolean(collection[paginationKey].nextCursor);
}
