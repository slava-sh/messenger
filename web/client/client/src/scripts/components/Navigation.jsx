import React, { PropTypes } from 'react';
import { collectionShape } from 'app/utils/Collection';
import Link from 'app/components/Link';
import ConversationList from 'app/components/ConversationList';

const Navigation = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversations: collectionShape.isRequired,
    router: PropTypes.object.isRequired,
  },

  componentDidMount() {
    const { conversations } = this.props;
    if (!conversations.isLoaded()) {
      conversations.loadMore();
    }
  },

  render() {
    const { user, conversations, router } = this.props;
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
        />
      </div>
    );
  },
});

export default Navigation;
