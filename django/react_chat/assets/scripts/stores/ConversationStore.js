import React, { PropTypes } from 'react';
import alt from 'app/alt';
import ConversationActions  from 'app/actions/ConversationActions';

export default alt.createStore(class ConversationStore {

  constructor() {
    this.conversations = [];

    this.bindListeners({
      onReceiveConversations: ConversationActions.RECEIVE_CONVERSATIONS,
    });
  }

  static getConversations() {
    return this.getState().conversations;
  }

  onReceiveConversations(conversations) {
    this.conversations = conversations;
  }
});
