import React, { PropTypes } from 'react';
import Message from 'app/components/Message';
import InfiniteScroll from 'app/components/InfiniteScroll';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object),
    loadMore: PropTypes.func.isRequired,
  },
  mixins: [InfiniteScroll({ upward: true })],

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
      return <Spinner />;
    }
    return (
      <div className="messages" onScroll={this.handleScroll}>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    );
  },
});

export default MessageList;
