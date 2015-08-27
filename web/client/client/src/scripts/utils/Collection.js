import { PropTypes } from 'react';
import { initialPaginationState } from 'app/utils/reducers';

const paginationShape = PropTypes.shape({
  ids: PropTypes.array,
  nextCursor: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
});

export const collectionShape = PropTypes.shape({
  pagination: paginationShape.isRequired,
  entities: PropTypes.object.isRequired,
  _requestMore: PropTypes.func.isRequired,
});

const identity = x => x;

export class Collection {

  constructor(pagination = initialPaginationState, entities = {}, requestMore, mapItem = identity) {
    this.pagination = pagination;
    this.entities = entities;
    this._requestMore = requestMore;
    this._mapItem = mapItem;
  }

  map(fn) {
    if (!this.pagination.ids) {
      return [];
    }
    return this.pagination.ids.map(id => fn(this._mapItem(this.entities[id])));
  }

  isLoading() {
    return this.pagination.isLoading;
  }

  isLoaded() {
    return Boolean(this.pagination.ids);
  }

  hasMore() {
    return Boolean(this.pagination.nextCursor) || !this.isLoaded();
  }

  loadMore() {
    if (!this.isLoading() && this.hasMore()) {
      this._requestMore();
    }
  }
}

export default Collection;
