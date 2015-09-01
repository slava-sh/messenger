import React from 'react';
import DocumentTitle from 'react-document-title';
import ModalLayout from 'app/pages/layouts/ModalLayout';
import LoginContainer from 'app/containers/LoginContainer';

const LoginPage = React.createClass({
  render() {
    return (
      <ModalLayout>
        <DocumentTitle title="Messenger" />
        <LoginContainer />
      </ModalLayout>
    );
  },
});

export default LoginPage;
