import contains from 'lodash/collection/contains';
import { camelizeKeys } from 'humps';
import * as api from 'app/utils/apiCallCreators';
import execute from 'app/utils/executeApiCall';
import * as ActionTypes from 'app/ActionTypes';
import { normalize } from 'app/utils/normalizer';

const TYPING_TIME = 10 * 1000;

export function loadConversations() {
  return {
    types: [
      ActionTypes.REQUEST_CONVERSATIONS,
      ActionTypes.RECEIVE_CONVERSATIONS,
      ActionTypes.FAILURE_CONVERSATIONS,
    ],
    callApi: api.getConversations(),
    getPagination: state => state.pagination.conversations,
    condition: state => {
      return !state.pagination.conversations.isLoading
              && (!state.pagination.conversations.isLoaded
                || state.pagination.conversations.nextCursor);
    },
  };
}

export function loadConversation(conversationId) {
  return {
    types: [
      ActionTypes.REQUEST_CONVERSATION,
      ActionTypes.RECEIVE_CONVERSATION,
      ActionTypes.FAILURE_CONVERSATION,
    ],
    payload: { conversationId },
    callApi: api.getConversation(conversationId),
    condition: state => {
      const conversation = state.entities.conversations[conversationId];
      return !conversation || !conversation.members || !conversation.messages;
    },
  };
}

export function loadMessages(conversationId) {
  return {
    types: [
      ActionTypes.REQUEST_MESSAGES,
      ActionTypes.RECEIVE_MESSAGES,
      ActionTypes.FAILURE_MESSAGES,
    ],
    payload: { conversationId },
    callApi: api.getMessages(conversationId),
    getPagination: state => state.pagination.messagesByConversation[conversationId],
    condition: ({ pagination: { messagesByConversation } }) => {
      const messagePagination = messagesByConversation[conversationId];
      return !messagePagination || !messagePagination.isLoaded || messagePagination.nextCursor;
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
      type: ActionTypes.SEND_TYPING,
      payload: { conversationId },
    });
    execute(api.sendTyping(conversationId));
  };
}

function stopTyping({ conversationId, userId }) {
  return {
    type: ActionTypes.STOP_TYPING,
    payload: { conversationId, userId },
  };
}

function startTyping({ conversationId, userId }) {
  return {
    type: ActionTypes.START_TYPING,
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
      type: ActionTypes.SEND_MESSAGE,
      payload: { conversationId, text },
    });
    execute(api.sendMessage({ conversationId, text }));
  };
}

export function receiveMessage({ conversationId, message }) {
  return dispatch => {
    dispatch(stopTyping({ conversationId, userId: message.author }));
    dispatch({
      type: ActionTypes.RECEIVE_MESSAGE,
      payload: { conversationId },
      // TODO: normalize somewhere else
      // TODO: better name
      response: normalize(camelizeKeys(message), api.message),
    });
  };
}
