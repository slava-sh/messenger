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
    const { conversations, router, loadMore } = this.props;
    return (
      <div className="conversations">
        <InfiniteScroll
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
        <div className="conversation">
          <button onClick={loadMore}>+</button>
        </div>
      </div>
    );
  },
});

export default ConversationList;
