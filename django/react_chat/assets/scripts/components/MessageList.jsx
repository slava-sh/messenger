import React, { PropTypes } from 'react';
import Message from 'app/components/Message';

const MessageList = React.createClass({
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  },

  render() {
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
