import React, { PropTypes } from 'react';
import Link from 'app/components/Link';

const ConversationList = React.createClass({
  propTypes: {
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
    router: PropTypes.object.isRequired
  },

  render() {
    const { conversations, router } = this.props;
    return (
      <div className="conversations">
        {conversations.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/react/c/${conversation.id}/`} router={router}>
              {conversation.name}
            </Link>
          </div>
        ))}
      </div>
    );
  }
});

export default ConversationList;
