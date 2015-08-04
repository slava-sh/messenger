import React from 'react';
import ConversationList from 'app/components/ConversationList';

export default React.createClass({
  displayName: 'Navigation',

  render() {
    return (
      <div className="navigation">
        <div className="header">
          <span className="username">/*FIXME*/</span>
          <a href="/react/c/new"><i className="fa fa-plus pull-left" /></a>
          <a href="/accounts/logout"><i className="fa fa-sign-out pull-right" /></a>
        </div>
        <ConversationList />
      </div>
    );
  },
});
