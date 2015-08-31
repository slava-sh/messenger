import React, { PropTypes } from 'react';
import Message from 'app/components/Message';
import TypingUsers from 'app/components/TypingUsers';
import InfiniteList from 'app/mixins/InfiniteList';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
//messages: collectionShape.isRequired,
    typingUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  },
  mixins: [InfiniteList({ upward: true })],

  loadMore() {
    this.props.messages.loadMore();
  },

  render() {
    const { messages, typingUsers } = this.props;
    if (!messages.isLoaded) {
      return <Spinner smooth />;
    }
    return (
      <div className="messages" onScroll={this.handleScroll}>
        {messages.isLoading && <Spinner />}
        {messages.items.reduceRight(
          ([previousAuthorId, result], message) => {
            const sequential = message.author.id === previousAuthorId;
            result.push(
              <Message
                key={message.id}
                message={message}
                sequential={sequential}
              />
            );
            return [message.author.id, result];
          },
          [null, []],
        )[1]}
        <TypingUsers users={typingUsers} />
      </div>
    );
  },
});

export default MessageList;
