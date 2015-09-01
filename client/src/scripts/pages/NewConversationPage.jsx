import React from 'react';
import DocumentTitle from 'react-document-title';
import ModalLayout from 'app/pages/layouts/ModalLayout';
import NewConversationContainer from 'app/containers/NewConversationContainer';

const NewConversationPage = React.createClass({
  render() {
    return (
      <ModalLayout>
        <DocumentTitle title="New conversation" />
        <NewConversationContainer />
      </ModalLayout>
    );
  },
});

export default NewConversationPage;
