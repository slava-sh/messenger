import find from 'lodash/collection/find';

export function getCurrentConversation(store) {
  const { entries, currentConversationId, currentMessages } = store;
  const currentConversation = find(entries, { id: currentConversationId });
  if (!currentConversation || !currentMessages) {
    return null;
  }
  return {
    ...currentConversation,
    messages: currentMessages
  };
}
