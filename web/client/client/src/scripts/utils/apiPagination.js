function urlToCursor(url) {
  if (!url) {
    return url;
  }
  const match = /cursor=(.+)$/.exec(url); // Assumes cursor is the last param.
  return match ? match[1] : null;
}

export function getCursor(paginatedCollection) {
  return urlToCursor(paginatedCollection.next);
}

export function getCollection(paginatedCollection) {
  return paginatedCollection.results;
}
