import React, { PropTypes } from 'react';

export default React.createClass({
  displayName: 'Message',
  propTypes: {
    message: PropTypes.object.isRequired,
  },

  render() {
    return (
      <div className="message">
        <div className="username">{this.props.message.author}</div>
        <div className="text">{this.props.message.text}</div>
      </div>
    );
  },
});
