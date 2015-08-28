import React from 'react';
import DocumentTitle from 'react-document-title';
import ModalLayout from 'app/pages/ModalLayout';

const LoginPage = React.createClass({
  render() {
    return (
      <ModalLayout>
        <DocumentTitle title="Messenger" />
        <div>
          Sign in.
        </div>
      </ModalLayout>
    );
  },
});

export default LoginPage;
