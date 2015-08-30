import React from 'react';
import DocumentTitle from 'react-document-title';
import ModalLayout from 'app/pages/layouts/ModalLayout';
import ConversationCreationContainer from 'app/containers/ConversationCreationContainer';

const ConversationCreationPage = React.createClass({
  render() {
    return (
      <ModalLayout>
        <DocumentTitle title="New conversation" />
        <ConversationCreationContainer />
      </ModalLayout>
    );
  },
});

export default ConversationCreationPage;
