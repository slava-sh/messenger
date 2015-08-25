import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/function/debounce';
import Spinner from 'app/components/Spinner';

const InfiniteScroll = React.createClass({

  getDefaultProps() {
    return {
      upward: false,
      threshold: 100,
    };
  },

  componentDidMount() {
    this.handleScroll();
  },

  componentDidUpdate() {
    this.handleScroll();
  },

  handleScroll() {
    const { upward, threshold } = this.props;
    const { scrollTop, scrollHeight, clientHeight } = findDOMNode(this);
    const margin = upward ? scrollTop : scrollHeight - scrollTop - clientHeight;
    if (margin < threshold) {
      this.loadMore();
    }
  },

  loadMore() {
    const { pagination, loadMore } = this.props;
    if (pagination.isLoading || !pagination.nextCursor) {
      return;
    }
    console.log('loadMore', pagination);
    loadMore();
  },

  render() {
    const { children, upward, threshold, pagination, ...other } = this.props;
    return (
      <div {...other} onScroll={this.handleScroll}>
        {upward && pagination.isLoading && <Spinner />}
        {children}
        {!upward && pagination.isLoading && <Spinner />}
      </div>
    );
  },
});

export default InfiniteScroll;
