import React from 'react';
import DocumentTitle from 'react-document-title';
import ModalLayout from 'app/pages/layouts/ModalLayout';
import RegistrationContainer from 'app/containers/RegistrationContainer';

const RegistrationPage = React.createClass({
  render() {
    return (
      <ModalLayout>
        <DocumentTitle title="Choose a username" />
        <RegistrationContainer />
      </ModalLayout>
    );
  },
});

export default RegistrationPage;
