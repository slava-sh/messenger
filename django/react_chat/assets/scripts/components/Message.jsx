import React, { PropTypes } from 'react';

const Message = React.createClass({
  propTypes: {
    message: PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="message">
        <div className="username">{this.props.message.author}</div>
        <div className="text">{this.props.message.text}</div>
      </div>
    );
  }
});

export default Message;
