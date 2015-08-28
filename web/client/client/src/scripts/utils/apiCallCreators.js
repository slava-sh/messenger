import { Schema, arrayOf } from 'app/utils/normalizer';
import { pagesOf } from 'app/utils/apiPagination';

const user = new Schema('users');
const conversation = new Schema('conversations');
const conversations = pagesOf(conversation);
export const message = new Schema('messages'); // TODO: don't export
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
  return ['POST', `conversations/${conversationId}/messages`, message, { text }];
}

export function sendCode(email) {
  return ['POST', `sessions`, null, { email }];
}

export function updateProfile({ userId, data }) {
  return ['PATCH', `users/${userId}`, user, data];
}
