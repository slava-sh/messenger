import React, { PropTypes } from 'react';
import alt from 'app/alt';
import ConversationActions  from 'app/actions/ConversationActions';

export default alt.createStore(class ConversationStore {

  constructor() {
    this.conversations = [];

    this.bindListeners({
      onReceiveConversations: ConversationActions.RECEIVE_CONVERSATIONS,
      onReceiveConversation: ConversationActions.RECEIVE_CONVERSATION,
    });
  }

  static getConversations() {
    return this.getState().conversations;
  }

  static getConversation(id) {
    return this.getState().conversations
      .filter((conversation) => conversation.id == id)[0];
  }

  onReceiveConversations(conversations) {
    this.conversations = conversations;
  }

  onReceiveConversation(conversation) {
    this.conversations.push(conversation);
  }
});
