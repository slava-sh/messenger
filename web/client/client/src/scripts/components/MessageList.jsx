import React, { PropTypes } from 'react';
import { collectionShape } from 'app/utils/Collection';
import Message from 'app/components/Message';
import InfiniteList from 'app/mixins/InfiniteList';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
    messages: collectionShape.isRequired,
  },
  mixins: [InfiniteList({ upward: true })],

  loadMore() {
    this.props.messages.loadMore();
  },

  render() {
    const { messages } = this.props;
    if (!messages.isLoaded()) {
      return <Spinner smooth />;
    }
    return (
      <div className="messages" onScroll={this.handleScroll}>
        {messages.isLoading() && <Spinner />}
        {messages.map(message => (
          <Message key={message.id} message={message} />
        )).reverse()}
      </div>
    );
  },
});

export default MessageList;
