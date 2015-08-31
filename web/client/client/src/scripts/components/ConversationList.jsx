import React, { PropTypes } from 'react';
import { items, isLoaded, isLoading, loadMore } from 'app/utils/pagination';
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
    if (!isLoaded(conversations)) {
      loadMore(conversations);
    }
  },

  loadMore() {
    const { conversations } = this.props;
    loadMore(conversations);
  },

  render() {
    const { conversations, router } = this.props;
    if (!isLoaded(conversations)) {
      return <Spinner smooth />;
    }
    return (
      <div className="conversations" onScroll={this.handleScroll}>
        {items(conversations).map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
        {isLoading(conversations) && <Spinner />}
      </div>
    );
  },
});

export default ConversationList;
