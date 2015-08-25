import React, { PropTypes } from 'react';
import Link from 'app/components/Link';
import InfiniteScroll from 'app/components/InfiniteScroll';

const ConversationList = React.createClass({
  propTypes: {
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
    router: PropTypes.object.isRequired,
    loadMore: PropTypes.func.isRequired,
  },
  mixins: [InfiniteScroll()],

  loadMore() {
    const { pagination, loadMore } = this.props;
    if (pagination.isLoading || !pagination.nextCursor) {
      return;
    }
    loadMore();
  },

  render() {
    const { conversations, router, loadMore, pagination } = this.props;
    return (
      <div className="conversations" onScroll={this.handleScroll}>
        {conversations.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
      </div>
    );
  },
});

export default ConversationList;
