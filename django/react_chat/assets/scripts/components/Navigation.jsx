import React from 'react';
import { connect } from 'react-redux';
import ConversationList from 'app/components/ConversationList';

function select(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(select)(React.createClass({
  displayName: 'Navigation',

  render() {
    return (
      <div className="navigation">
        <div className="header">
          <span className="username">{this.props.user.name}</span>
          <a href="/react/c/new"><i className="fa fa-plus pull-left" /></a>
          <a href="/accounts/logout"><i className="fa fa-sign-out pull-right" /></a>
        </div>
        <ConversationList />
      </div>
    );
  },
}));
