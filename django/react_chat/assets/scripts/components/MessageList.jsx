import React, { PropTypes } from 'react';
import Message from 'app/components/Message';

export default React.createClass({
  displayName: 'MessageList',
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  },

  render() {
    let messages = this.props.messages;
    return (
      <div className="messages">
        {messages.map((message) => <Message key={message.id} message={message} />)}
      </div>
    );
  },
});
