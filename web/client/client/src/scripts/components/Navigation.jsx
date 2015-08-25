import React, { PropTypes } from 'react';
import Link from 'app/components/Link';
import ConversationList from 'app/components/ConversationList';
import Spinner from 'app/components/Spinner';

const Navigation = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversations: PropTypes.arrayOf(PropTypes.object),
    router: PropTypes.object.isRequired,
    loadConversations: PropTypes.func.isRequired,
  },

  render() {
    const { user, conversations, router, loadConversations, pagination } = this.props;
    if (!conversations) {
      return <Spinner />;
    }
    return (
      <div className="navigation">
        <div className="header">
          <span className="username">{user.name}</span>
          <Link to="/c/new" router={router}><i className="fa fa-plus pull-left" /></Link>
          <a href="/accounts/logout"><i className="fa fa-sign-out pull-right" /></a>
        </div>
        <ConversationList
          conversations={conversations}
          router={router}
          loadMore={loadConversations}
          pagination={pagination}
        />
      </div>
    );
  },
});

export default Navigation;
