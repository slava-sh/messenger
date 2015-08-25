import isPlainObject from 'lodash/lang/isPlainObject';
import isArray from 'lodash/lang/isArray';
import mapValues from 'lodash/object/mapValues';
import { arrayOf } from 'app/utils/normalizer';

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

function getCollection(paginatedCollection) {
  return paginatedCollection.results;
}

const IS_PAGINATION_OBJECT = 'IS_PAGINATION_OBJECT';

function paginationObject(obj) {
  return {
    ...obj,
    [IS_PAGINATION_OBJECT]: true,
  };
}

export function pagesOf(schema) {
  return obj => [
    paginationObject(obj),
    {
      results: arrayOf(schema),
    },
  ];
}

export function stripPagination(obj) {
  if (isPlainObject(obj)) {
    if (obj[IS_PAGINATION_OBJECT]) {
      return stripPagination(getCollection(obj));
    }
    return mapValues(obj, stripPagination);
  }
  if (isArray(obj)) {
    return obj.map(stripPagination);
  }
  return obj;
}
