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
    getPagination: state => state.conversations.all,
    condition: state => {
      return !state.conversations.all.isLoading
              && (!state.conversations.all.ids
                || state.conversations.all.nextCursor);
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
      const conversation = state.conversations.byId[conversationId];
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
    getPagination: state => state.messages.byConversation[conversationId],
    condition: ({ messages: { byConversation } }) => {
      const messagePagination = byConversation[conversationId];
      return !messagePagination
              || (!messagePagination.isLoading
                && (!messagePagination.ids || messagePagination.nextCursor));
    },
  };
}

export function sendTyping(conversationId) { // TODO: refactor
  return (dispatch, getState) => {
    const { users, conversations } = getState();
    const conversation = conversations.byId[conversationId];
    if (contains(conversation.typingUserIds, users.current.id)) {
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
    const { users: { current: { id: userId }} } = getState();
    dispatch(stopTyping({ conversationId, userId }));
    dispatch({
      type: ActionTypes.SEND_MESSAGE,
      payload: { conversationId, text },
    });
    execute(api.sendMessage({ conversationId, text }));
  };
}

export function receiveMessage({ conversationId, message }) {
  return (dispatch, getState) => {
    dispatch(stopTyping({ conversationId, userId: message.author }));
    dispatch({
      type: ActionTypes.RECEIVE_MESSAGE,
      payload: { conversationId },
      // TODO: normalize somewhere else
      // TODO: better name
      response: normalize(camelizeKeys(message), api.message),
    });

    const { conversations } = getState();
    if (!conversations.byId[conversationId]) {
      // TODO: call this unconditionally, but supply required fields
      dispatch(loadConversation(conversationId));
    }
  };
}

export function createConversation({ name, members }) {
  return {
    types: [
      ActionTypes.CREATE_CONVERSATION,
      ActionTypes.CREATE_CONVERSATION_SUCCESS,
      ActionTypes.CREATE_CONVERSATION_FAILURE,
    ],
    callApi: api.createConversation({ name, members }),
  };
}
