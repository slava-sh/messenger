import mapValues from 'lodash/object/mapValues';
import get from 'lodash/object/get';
import flatten from 'lodash/array/flatten';

function identity(x) {
  return x;
}

export function expand(collection, paginationKey = 'all', expandItem = identity) {
  const pagination = get(collection, paginationKey, {});
  const ids = pagination.ids || [];
  const items = ids.map(id => {
    const item = collection.byId[id];
    return item && expandItem ? expandItem(item) : item;
  }).filter(Boolean);
  return {
    ...pagination,
    items,
  };
}

export function withLoader(pagination, loader) { // TODO: need this?
  return {
    ...pagination,
    loadMore: loader,
  };
}

export function items(pagination) {
  return pagination.items || [];
}

export function loadMore(pagination) {
  return pagination.loadMore();
}

export function isLoaded(pagination) {
  return Boolean(pagination.ids);
}

export function isLoading(pagination) {
  return pagination.isLoading;
}

export function hasMore(pagination) {
  if (!pagination.loadMore) {
    return false;
  }
  if (!isLoaded(pagination)) {
    return true;
  }
  return Boolean(pagination.nextCursor);
}
