import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/function/debounce';
import Spinner from 'app/components/Spinner';

const InfiniteScroll = React.createClass({

  getDefaultProps() {
    return {
      upward: false,
      threshold: 100,
      spinner: null,
    };
  },

  componentDidMount() {
    this.lastScrollPosition = 0; // Not in the state to avoid re-rendering
    this.handleScroll();
  },

  componentDidUpdate() {
    this.restoreScrollPosition();
    this.handleScroll();
  },

  handleScroll() {
    const { upward, threshold } = this.props;
    const { scrollTop, scrollHeight, clientHeight } = findDOMNode(this);

    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    this.lastScrollPosition = upward ? scrollBottom : scrollTop;

    const margin = upward ? scrollTop : scrollBottom;
    if (margin < threshold) {
      this.loadMore();
    }
  },

  restoreScrollPosition() {
    const { upward } = this.props;
    const node = findDOMNode(this);
    node.scrollTop = upward
      ? node.scrollHeight - this.lastScrollPosition - node.clientHeight
      : this.lastScrollPosition;
  },

  loadMore() {
    const { pagination, loadMore } = this.props;
    if (pagination.isLoading || !pagination.nextCursor) {
      return;
    }
    loadMore();
  },

  render() {
    const { children, upward, threshold, pagination, spinner, ...other } = this.props;
    return (
      <div {...other} onScroll={this.handleScroll}>
        {upward && pagination.isLoading && spinner}
        {children}
        {!upward && pagination.isLoading && spinner}
      </div>
    );
  },
});

export default InfiniteScroll;
