import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversation, loadMessages, sendMessage, sendTyping } from 'app/actions/conversation';
import Collection from 'app/utils/Collection';
import Chat from 'app/components/Chat';

function mapStateToProps(state, ownProps) {
  const {
    userId,
    entities,
    pagination: { messagesByConversation },
  } = state;
  const { conversationId } = ownProps;
  const { conversations, users } = entities;
  const conversation = conversations[conversationId];
  const typingUserIds = (conversation || {}).typingUserIds || [];
  const typingUsers = typingUserIds.map(id => users[id]).filter(Boolean);
  return {
    user: entities.users[userId],
    conversation,
    typingUsers,
    users,
    messages: entities.messages,
    messagePagination: messagesByConversation[conversationId],
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { conversationId } = ownProps;
  const { messagePagination, messages, users, ...other } = stateProps;
  return {
    ...ownProps,
    ...other,
    ...dispatchProps,
    messages: new Collection(
      messagePagination,
      messages,
      () => dispatchProps.loadMessages(conversationId),
      message => ({
        ...message,
        author: users[message.author] || {},
      }),
    ),
    sendMessage: text => dispatchProps.sendMessage({ conversationId, text }),
    sendTyping: () => dispatchProps.sendTyping(conversationId),
    loadConversation: () => dispatchProps.loadConversation(conversationId),
  };
}

function loadData(props) {
  props.loadConversation();
}

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.string.isRequired,
    loadConversation: PropTypes.func.isRequired,
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
