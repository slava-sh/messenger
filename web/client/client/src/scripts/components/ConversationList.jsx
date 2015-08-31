import React, { PropTypes } from 'react';
import InfiniteList from 'app/mixins/InfiniteList';
import Link from 'app/components/Link';
import Spinner from 'app/components/Spinner';

const ConversationList = React.createClass({
  propTypes: {
//conversations: collectionShape.isRequired,
    router: PropTypes.object.isRequired,
  },
  mixins: [InfiniteList()],

  componentDidMount() {
    const { conversations } = this.props;
    if (conversations.isLoaded) {
      conversations.loadMore();
    }
  },

  loadMore() {
    const { conversations } = this.props;
    conversations.loadMore();
  },

  render() {
    const { conversations, router } = this.props;
    if (!conversations.isLoaded) {
      return <Spinner smooth />;
    }
    return (
      <div className="conversations" onScroll={this.handleScroll}>
        {conversations.items.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
        {conversations.isLoading && <Spinner />}
      </div>
    );
  },
});

export default ConversationList;
