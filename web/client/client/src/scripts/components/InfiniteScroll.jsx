import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/function/debounce';
import Spinner from 'app/components/Spinner';

const InfiniteScroll = React.createClass({

  loadMore() {
    const { pagination, loadMore } = this.props;
    if (pagination.isLoading || !pagination.nextCursor) {
      return;
    }
    console.log('loadMore', pagination);
    loadMore();
  },

  componentDidMount() {
    this.handleScroll();
  },

  componentDidUpdate() {
    this.handleScroll();
  },

  handleScroll() {
    const container = findDOMNode(this);
    const pixelsToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (pixelsToBottom < 100) {
      this.loadMore();
    }
  },

  render() {
    var { children, hasMore, loader: spinner, pagination, ...other } = this.props;
    return (
      <div {...other} onScroll={this.handleScroll}>
        {children}
        {pagination.isLoading && (<Spinner />)}
      </div>
    );
  },
});

export default InfiniteScroll;
