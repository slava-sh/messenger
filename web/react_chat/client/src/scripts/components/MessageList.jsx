import React, { PropTypes } from 'react';
import Message from 'app/components/Message';
import Spinner from 'app/components/Spinner';

const MessageList = React.createClass({
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object),
  },

  render() {
    if (!this.props.messages) {
      return <Spinner />;
    }
    return (
      <div className="messages">
        {this.props.messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    );
  },
});

export default MessageList;
