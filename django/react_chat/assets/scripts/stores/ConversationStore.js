import React, { PropTypes } from 'react';
import alt from 'app/alt';
import ConversationActions  from 'app/actions/ConversationActions';

export default alt.createStore({
  displayName: 'ConversationStore',

  bindListeners: {
    receiveConversations: ConversationActions.RECEIVE_CONVERSATIONS,
  },

  state: {
    conversations: [],
  },

  publicMethods: {
    getState() {
      return this.state.conversations;
    }
  },

  receiveConversations(conversations) {
    this.state.conversations = conversations;
  },
});
