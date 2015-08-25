import React, { PropTypes } from 'react';
import { collectionShape } from 'app/utils/Collection';
import InfiniteList from 'app/mixins/InfiniteList';
import Link from 'app/components/Link';
import Spinner from 'app/components/Spinner';

const ConversationList = React.createClass({
  propTypes: {
    conversations: collectionShape.isRequired,
    router: PropTypes.object.isRequired,
  },
  mixins: [InfiniteList()],

  loadMore() {
    this.props.conversations.loadMore();
  },

  render() {
    const { conversations, router } = this.props;
    return (
      <div className="conversations" onScroll={this.handleScroll}>
        {conversations.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
        {conversations.isLoading() && <Spinner />}
      </div>
    );
  },
});

export default ConversationList;
