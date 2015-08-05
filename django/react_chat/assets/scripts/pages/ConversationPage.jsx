import React from 'react';
import DefaultLayout from 'app/pages/DefaultLayout';
import ChatContainer from 'app/containers/ChatContainer';

const ConversationPage = React.createClass({
  render() {
    let conversationId = +this.props.params.id;
    return (
      <DefaultLayout>
        <ChatContainer conversationId={conversationId} />
      </DefaultLayout>
    );
  },
});

export default ConversationPage;
