import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { requestConversations } from 'app/actions/conversation';

function select(state) {
  const { conversations, router } = state;
  return {
    conversations,
    router
  };
}

export default connect(select)(React.createClass({
  displayName: 'ConversationList',

  componentDidMount() {
    this.props.dispatch(requestConversations());
  },

  render() {
    const { conversations, dispatch } = this.props;
    return (
      <div className="conversations">
        {conversations.map(conversation => (
          <div key={`${conversation.id}`} className="conversation">
            <Link to={`/react/c/${conversation.id}/`} activeClass="active">
              {conversation.name}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}));
