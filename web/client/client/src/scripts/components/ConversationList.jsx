import React, { PropTypes } from 'react';
import Link from 'app/components/Link';
import InfiniteScroll from 'app/components/InfiniteScroll';

const ConversationList = React.createClass({
  propTypes: {
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
    router: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
  },

  render() {
    const { conversations, router, loadMore, pagination } = this.props;
    return (
      <InfiniteScroll
        className="conversations"
        pagination={pagination}
        loadMore={loadMore}
        hasMore={true}
        loader={<div className="loader">Loading ...</div>}>
        {conversations.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
      </InfiniteScroll>
    );
  },
});

export default ConversationList;
