import React, { PropTypes } from 'react';
import DefaultLayout from 'app/pages/layouts/DefaultLayout';
import ChatContainer from 'app/containers/ChatContainer';

const ConversationPage = React.createClass({
  propTypes: {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  },

  render() {
    const conversationId = this.props.params.id;
    return (
      <DefaultLayout>
        <ChatContainer conversationId={conversationId} />
      </DefaultLayout>
    );
  },
});

export default ConversationPage;
