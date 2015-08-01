import React, { PropTypes } from 'react';
import alt from 'app/alt';
import ConversationActions  from 'app/actions/ConversationActions';

export default alt.createStore({
  displayName: 'ConversationStore',
  bindListeners: {
    requestConversations: ConversationActions.REQUEST_CONVERSATIONS,
  },

  requestConversations() {
    console.log('requesting conversations');
    return false;
  },
});
