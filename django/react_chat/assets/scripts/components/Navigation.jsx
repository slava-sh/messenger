import React, { PropTypes } from 'react';
import Link from 'app/components/Link';
import ConversationList from 'app/components/ConversationList';

const Navigation = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
    router: PropTypes.object.isRequired
  },

  render() {
    const { user, conversations, router } = this.props;
    return (
      <div className="navigation">
        <div className="header">
          <span className="username">{user.name}</span>
          <Link to="/react/c/new" router={router}><i className="fa fa-plus pull-left" /></Link>
          <a href="/accounts/logout"><i className="fa fa-sign-out pull-right" /></a>
        </div>
        <ConversationList conversations={conversations} router={router} />
      </div>
    );
  },
});

export default Navigation;
