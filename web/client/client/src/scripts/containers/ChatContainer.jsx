import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversation, loadMessages, sendMessage, sendTyping } from 'app/actions/conversation';
import Collection from 'app/utils/Collection';
import Chat from 'app/components/Chat';

function mapStateToProps(state, ownProps) {
  const { users, messages, conversations } = state;
  const { conversationId } = ownProps;
  const conversation = conversations.byId[conversationId];
  const typingUserIds = (conversation || {}).typingUserIds || [];
  const typingUsers = typingUserIds.map(id => users.byId[id]).filter(Boolean);
  return {
    user: users.byId[users.current.id],
    usersById: users.byId,
    conversation,
    typingUsers,
    messages: messages.byId,
    messagePagination: messages.byConversation[conversationId],
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { conversationId } = ownProps;
  const { messagePagination, messages, usersById, ...other } = stateProps;
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
        author: usersById[message.author] || {},
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
