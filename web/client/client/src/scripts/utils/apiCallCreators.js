import { Schema, arrayOf, proxy } from 'app/utils/normalizer';

const pagesOf = schema => ({ results: arrayOf(schema) });

const user = new Schema('users');
const conversation = new Schema('conversations');
const conversations = pagesOf(conversation);
const message = new Schema('messages');
const messages = pagesOf(message);

conversation.define({
  members: arrayOf(user),
  messages,
});

export function getConversations() {
  return ['GET', 'conversations', conversations];
}

export function getConversation(conversationId) {
  return ['GET', `conversations/${conversationId}`, conversation];
}

export function getMessages(conversationId) {
  return ['GET', `conversations/${conversationId}/messages`, messages];
}

export function sendTyping(conversationId) {
  return ['POST', `conversations/${conversationId}/typing`];
}

export function sendMessage({ conversationId, text }) {
  return ['POST', `conversations/${conversationId}/messages`, null, { text }]; // TODO: parse response
}
