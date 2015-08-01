import React from 'react';
import MessageList from 'app/components/MessageList';

export default React.createClass({
  render: function() {
    return (
      <div className="main">
        <div className="header">
          <span className="username">%- conversation.get('name') %</span>
          <a href="#"><i className="fa fa-gear pull-right"></i></a>
        </div>
        <MessageList />
        <div className="new-message">
          <form method="post">
            <div className="username">%- App.user %</div>
            <div className="text"><textarea name="text" /></div>
            <div><input type="submit" value="Send" /></div>
          </form>
        </div>
      </div>
    );
  }
});
