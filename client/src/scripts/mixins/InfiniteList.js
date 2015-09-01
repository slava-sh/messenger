import { findDOMNode } from 'react-dom';

/*
 * Usage:
 * 1. Add the mixin.
 * 2. Set onScoll={this.handleScroll} on the root element of the component.
 * 3. Implement loadMore().
 */
const InfiniteList = ({ upward = false, threshold = 100 } = {}) => ({

  componentDidMount() {
    this.lastScrollPosition = 0; // Not in the state to avoid re-rendering
    this.handleScroll();
  },

  componentDidUpdate() {
    this.restoreScrollPosition();
    this.handleScroll();
  },

  handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = findDOMNode(this);

    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    this.lastScrollPosition = upward ? scrollBottom : scrollTop;

    const margin = upward ? scrollTop : scrollBottom;
    if (margin < threshold) {
      this.loadMore();
    }
  },

  restoreScrollPosition() {
    if (upward) {
      this.scrollBottomTo(this.lastScrollPosition);
    } else {
      this.scrollTopTo(this.lastScrollPosition);
    }
  },

  scrollTopTo(position) {
    const node = findDOMNode(this);
    node.scrollTop = position;
    this.handleScroll();
  },

  scrollBottomTo(position) {
    const node = findDOMNode(this);
    node.scrollTop = node.scrollHeight - position - node.clientHeight;
    this.handleScroll();
  },
});

export default InfiniteList;
