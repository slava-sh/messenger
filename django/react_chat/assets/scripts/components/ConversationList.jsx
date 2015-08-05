import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ConversationList = React.createClass({
  propTypes: {
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  },

  render() {
    return (
      <div className="conversations">
        {this.props.conversations.map(conversation => (
          <div key={conversation.id} className="conversation">
            <Link to={`/react/c/${conversation.id}/`} activeClassName="active">
              {conversation.name}
            </Link>
          </div>
        ))}
      </div>
    );
  }
});

export default ConversationList;
