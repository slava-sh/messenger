import React, { PropTypes } from 'react';
import Message from 'app/components/Message';
import InfiniteList from 'app/mixins/InfiniteList';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object),
    loadMore: PropTypes.func.isRequired,
  },
  mixins: [InfiniteList({ upward: true })],

  loadMore() {
    const { pagination, loadMore } = this.props;
    if (pagination.isLoading || !pagination.nextCursor) {
      return;
    }
    loadMore();
  },

  render() {
    const { messages, loadMore, pagination } = this.props;
    if (!messages) {
      return <Spinner smooth />;
    }
    return (
      <div className="messages" onScroll={this.handleScroll}>
        {pagination.isLoading && <Spinner />}
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    );
  },
});

export default MessageList;
