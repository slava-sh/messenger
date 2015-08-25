import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/function/debounce';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

const InfiniteScroll = React.createClass({
  getDefaultProps() {
    return {
      hasMore: false,
      threshold: 250,
    };
  },

  componentDidMount() {
    this.loadMore = debounce(this.loadMore, 900);
    this.attachScrollListener();
  },

  componentWillUnmount() {
    this.detachScrollListener();
  },

  componentDidUpdate() {
    this.attachScrollListener();
  },

  loadMore() {
    this.props.loadMore();
  },

  scrollListener() {
    var el = findDOMNode(this);
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.loadMore();
    }
  },

  attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  },

  detachScrollListener() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  },

  render() {
    var { children, hasMore, loader: spinner } = this.props;
    return (
      <div>
        {children}
        {hasMore && spinner}
      </div>
    );
  },
});

export default InfiniteScroll;
