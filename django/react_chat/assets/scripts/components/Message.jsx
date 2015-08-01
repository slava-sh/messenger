import React from 'react';

export default React.createClass({
  displayName: 'Message',

  render() {
    return (
      <div className="message">
        <div className="username">%- message.get('author') %</div>
        <div className="text">%- message.get('text') %</div>
      </div>
    );
  },
});
