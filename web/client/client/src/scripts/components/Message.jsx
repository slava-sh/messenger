import React, { PropTypes } from 'react';

const Message = React.createClass({
  propTypes: {
    message: PropTypes.object.isRequired,
  },

  render() {
    const { message } = this.props;
    return (
      <div className="message">
        <div className="message__avatar">
          <img src={message.author.avatarUrl} />
        </div>
        <div className="message__body">
          <div className="message__author">
            <span className="username">{message.author.username}</span>
          </div>
          <div className="message__text">{message.text}</div>
        </div>
      </div>
    );
  },
});

export default Message;
