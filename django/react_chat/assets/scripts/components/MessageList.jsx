import React from 'react';
import Message from 'app/components/Message';

export default React.createClass({
  render() {
    let messages = []
    for (let i of '1234567890') {
      messages.push(<Message key={i} />);
    }
    return <div className="messages">{messages}</div>;
  },
});
