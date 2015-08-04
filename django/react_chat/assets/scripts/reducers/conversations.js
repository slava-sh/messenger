import { handleActions } from 'redux-actions';

export const initialState = [];

export const reducer = handleActions({
  RECEIVE_CONVERSATIONS: (state, action) => action.payload
}, initialState);

export default reducer;

//  constructor() {
//    this.conversations = [];
//    this.conversationsById = {};
//
//    this.bindListeners({
//      onReceiveConversations: ConversationActions.RECEIVE_CONVERSATIONS,
//      onReceiveConversation: ConversationActions.RECEIVE_CONVERSATION,
//    });
//  }
//
//  static getConversations() {
//    return this.getState().conversations;
//  }
//
//  static getConversation(idx) {
//    return this.getState().conversationsById[idx];
//  }
//
//  onReceiveConversations(conversations) {
//    conversations.forEach(this.updateConversation.bind(this));
//  }
//
//  onReceiveConversation(conversation) {
//    this.updateConversation(conversation);
//  }
//
//  updateConversation(conversation) {
//    if (!this.conversationsById.hasOwnProperty(conversation.id)) {
//      this.conversations.push(conversation);
//    }
//    this.conversationsById[conversation.id] = conversation;
//  }
