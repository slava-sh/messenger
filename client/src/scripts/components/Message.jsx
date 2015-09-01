import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Message = React.createClass({
  propTypes: {
    message: PropTypes.object.isRequired,
    sequential: PropTypes.bool.isRequired,
  },

  render() {
    const { message, sequential } = this.props;
    const classes = classNames({
      'message': true,
      'message--sequential': sequential,
    });
    return (
      <div className={classes}>
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
