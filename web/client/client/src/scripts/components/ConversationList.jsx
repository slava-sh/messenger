import React, { PropTypes } from 'react';
import Link from 'app/components/Link';

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
        {conversations.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
        <div className="conversation">
          <button onClick={loadMore}>+</button>
        </div>
      </div>
    );
  },
});

export default ConversationList;
