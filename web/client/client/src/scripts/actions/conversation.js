import contains from 'lodash/collection/contains';
import * as Schemas from 'app/utils/apiSchemas';
import callApi from 'app/utils/callApi';

const TYPING_TIME = 10 * 1000;

export function loadConversations() {
  return {
    types: ['REQUEST_CONVERSATIONS', 'RECEIVE_CONVERSATIONS_SUCCESS', 'RECEIVE_CONVERSATIONS_FAILURE'],
    endpoint: 'conversations',
    schema: Schemas.conversations,
    condition: state => !state.pagination.conversations.isLoaded,
  };
}

export function loadConversation(conversationId) {
  return {
    types: ['REQUEST_CONVERSATION', 'RECEIVE_CONVERSATION_SUCCESS', 'RECEIVE_CONVERSATION_FAILURE'],
    payload: { conversationId },
    endpoint: `conversations/${conversationId}`,
    schema: Schemas.conversation,
    condition: state => {
      const conversation = state.entities.conversations[conversationId];
      return !conversation || !conversation.members || !conversation.messages;
    },
  };
}

export function loadMessages(conversationId) {
  return {
    types: ['REQUEST_MESSAGES', 'RECEIVE_MESSAGES_SUCCESS', 'RECEIVE_MESSAGES_FAILURE'],
    payload: { conversationId },
    endpoint: `conversations/${conversationId}/messages`,
    schema: Schemas.messages,
    condition: ({ pagination: { messagesByConversation } }) => {
      const messagePagination = messagesByConversation[conversationId];
      return !messagePagination || !messagePagination.isLoaded;
    },
  };
}

export function sendTyping(conversationId) { // TODO: refactor
  return (dispatch, getState) => {
    const { user, entities: { conversations } } = getState();
    const conversation = conversations[conversationId];
    if (contains(conversation.typingUserIds, user.id)) {
      return;
    }
    dispatch({
      type: 'SEND_TYPING',
      payload: { conversationId },
    });
    callApi('POST', `conversations/${conversationId}/typing`);
  };
}

function stopTyping({ conversationId, userId }) {
  return {
    type: 'STOP_TYPING',
    payload: { conversationId, userId },
  };
}

function startTyping({ conversationId, userId }) {
  return {
    type: 'START_TYPING',
    payload: { conversationId, userId },
  };
}

export function receiveTyping({ conversationId, userId }) {
  return dispatch => {
    dispatch(startTyping({ conversationId, userId }));
    setTimeout(() => {
      // We would like to clear this timeout in `stopTyping`, but then we
      // would have to manage a (conversationId, userId) -> timeout collection.
      dispatch(stopTyping({ conversationId, userId }));
    }, TYPING_TIME);
  };
}

export function sendMessage({ conversationId, text }) {
  return (dispatch, getState) => {
    const { user: { id: userId } } = getState();
    dispatch(stopTyping({ conversationId, userId }));
    dispatch({
      type: 'SEND_MESSAGE',
      payload: { conversationId, text },
    });
    callApi('POST', `conversations/${conversationId}/messages`, { text });
  };
}

export function receiveMessage({ conversationId, message }) {
  return dispatch => {
    dispatch(stopTyping({ conversationId, userId: message.author }));
    dispatch({
      type: 'RECEIVE_MESSAGE',
      payload: { conversationId, message },
    });
  };
}
