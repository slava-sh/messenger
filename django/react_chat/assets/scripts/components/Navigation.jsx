import React from 'react';
import ConversationList from 'app/components/ConversationList';

const Navigation = React.createClass({
  render() {
    return (
      <div className="navigation">
        <div className="header">
          <span className="username">{this.props.user.name}</span>
          <a href="/react/c/new"><i className="fa fa-plus pull-left" /></a>
          <a href="/accounts/logout"><i className="fa fa-sign-out pull-right" /></a>
        </div>
        <ConversationList conversations={this.props.conversations} />
      </div>
    );
  },
});

export default Navigation;
