import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversation, loadMessages, sendMessage, sendTyping } from 'app/actions/conversation';
import Chat from 'app/components/Chat';

function mapStateToProps(state, ownProps) {
  const { conversationId } = ownProps;
  const {
    user,
    entities,
    pagination: { messagesByConversation },
  } = state;
  const { conversations, users } = entities;
  const conversation = conversations[conversationId];
  const messagePagination = messagesByConversation[conversationId] || { ids: [] };
  const messages = (messagePagination.isLoaded ? messagePagination.ids : []).map(id => {
    const message = entities.messages[id];
    return {
      ...message,
      author: users[message.author],
    };
  });
  const typingUserIds = (conversation || {}).typingUserIds || [];
  const typingUsers = typingUserIds.map(id => users[id]).filter(Boolean);
  return {
    user,
    conversation,
    messages,
    typingUsers,
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { conversationId } = ownProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    sendMessage: text => dispatchProps.sendMessage({ conversationId, text }),
    sendTyping: () => dispatchProps.sendTyping(conversationId),
    loadConversation: () => dispatchProps.loadConversation(conversationId),
    loadMessages: () => dispatchProps.loadMessages(conversationId),
  };
}

function loadData(props) {
  props.loadConversation();
}

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.string.isRequired,
    loadConversation: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
  },

  componentDidMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.conversationId !== this.props.conversationId) {
      loadData(nextProps);
    }
  },

  render() {
    const {
      conversationId,
      loadConversation,
      ...other,
    } = this.props;
    return <Chat {...other} />;
  },
});

export default connect(
  mapStateToProps,
  { loadConversation, loadMessages, sendMessage, sendTyping },
  mergeProps,
)(ChatContainer);
