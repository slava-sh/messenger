import React, { PropTypes } from 'react';
import Message from 'app/components/Message';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object),
    loadMore: PropTypes.func.isRequired,
  },

  render() {
    const { messages, loadMore } = this.props;
    if (!messages) {
      return <Spinner />;
    }
    return (
      <div className="messages">
        <div className="message">
          <button onClick={loadMore}>+</button>
        </div>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    );
  },
});

export default MessageList;
