import { PropTypes } from 'react';
import { initialPaginationState } from 'app/utils/reducers';

const paginationShape = PropTypes.shape({
  ids: PropTypes.array.isRequired,
  nextCursor: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
});

export const collectionShape = PropTypes.shape({
  pagination: paginationShape.isRequired,
  entities: PropTypes.object.isRequired,
  _requestMore: PropTypes.func.isRequired,
});

export class Collection {

  constructor(pagination = initialPaginationState, entities = {}, requestMore) {
    this.pagination = pagination;
    this.entities = entities;
    this._requestMore = requestMore;
  }

  map(fn) {
    if (!this.pagination.ids) {
      return [];
    }
    return this.pagination.ids.map(id => fn(this.entities[id]));
  }

  isLoading() {
    return this.pagination.isLoading;
  }

  isLoaded() {
    return this.pagination.isLoaded; // TODO: use ids !== null instead
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
