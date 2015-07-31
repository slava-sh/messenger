import React from 'react';

export default React.createClass({
  render: function() {
    let conversations = []
    for (let i of '1234567890') {
      conversations.push(
        <div key={i} className="conversation">
          <a href="?">%- conversation.get('name') %</a>
        </div>
      );
    }
    return <div className="conversations">{conversations}</div>;
  }
});
