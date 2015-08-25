import React, { PropTypes } from 'react';
import Message from 'app/components/Message';
import InfiniteScroll from 'app/components/InfiniteScroll';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object),
    loadMore: PropTypes.func.isRequired,
  },

  render() {
    const { messages, loadMore, pagination } = this.props;
    if (!messages) {
      return <Spinner />;
    }
    return (
      <InfiniteScroll
        className="messages"
        pagination={pagination}
        loadMore={loadMore}
        upward={true}>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </InfiniteScroll>
    );
  },
});

export default MessageList;
