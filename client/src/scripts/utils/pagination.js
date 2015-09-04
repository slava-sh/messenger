import get from 'lodash/object/get';

function identity(x) {
  return x;
}

export function expand(collection, paginationPath = 'all', expandItem = identity) {
  const pagination = get(collection, paginationPath, {});
  const ids = pagination.ids || [];
  const items = ids.map(id => {
    const item = collection.byId[id];
    return item && expandItem ? expandItem(item) : item;
  }).filter(Boolean);
  return {
    hasMore: false,
    ...pagination,
    items,
    isLoaded: Boolean(pagination.ids),
  };
}

export function withLoader(pagination, loader) {
  return {
    ...pagination,
    loadMore: loader,
    hasMore: !pagination.isLoaded || Boolean(pagination.nextCursor),
  };
}

export function expandSingleton(collection, path, expandItem = identity) {
  const singleton = get(collection, path, {});
  const item = collection.byId[singleton.id];
  const expandedItem = item && expandItem ? expandItem(item) : (item || {});
  return {
    ...singleton,
    ...expandedItem,
    isLoaded: Boolean(singleton.id),
  };
}
