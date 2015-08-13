import find from 'lodash/collection/find';

export function getCurrentConversation(store) {
  const {
    entries,
    currentConversationId,
    currentMessages,
    typingUserIds,
  } = store;
  const conversation = find(entries, { id: currentConversationId });
  if (!conversation) {
    return null;
  }
  return {
    ...conversation,
    messages: currentMessages,
    typingUserIds,
  };
}
