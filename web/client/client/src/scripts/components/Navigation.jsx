import React, { PropTypes } from 'react';
import Link from 'app/components/Link';
import ConversationList from 'app/components/ConversationList';

const Navigation = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
// conversations: collectionShape.isRequired,
    router: PropTypes.object.isRequired,
  },

  render() {
    const { user, conversations, router } = this.props;
console.log(conversations);
    return (
      <div className="navigation">
        <div className="header">
          <span className="username">{user.username}</span>
          <Link to="/c/new/" router={router}><i className="fa fa-plus pull-left" /></Link>
          <a href="/accounts/logout/"><i className="fa fa-sign-out pull-right" /></a>
        </div>
        <ConversationList
          conversations={conversations}
          router={router}
        />
      </div>
    );
  },
});

export default Navigation;
