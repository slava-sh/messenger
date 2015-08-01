import React from 'react';
import DefaultLayout from 'app/components/DefaultLayout';
import Chat from 'app/components/Chat';

export default React.createClass({
  displayName: 'ConversationPage',

  render() {
    return (
      <DefaultLayout>
        <Chat />
      </DefaultLayout>
    );
  },
});
