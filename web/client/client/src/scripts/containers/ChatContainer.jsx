import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversation, loadMessages, sendMessage, sendTyping } from 'app/actions/conversation';
import { expand, withLoader } from 'app/utils/pagination';
import Chat from 'app/components/Chat';

function mapStateToProps(state, ownProps) {
  const { conversationId } = ownProps;
  const { users, messages, conversations } = state;
  const conversation = conversations.byId[conversationId];
  const typingUserIds = (conversation || {}).typingUserIds || [];
  const typingUsers = typingUserIds.map(id => users.byId[id]).filter(Boolean);
  return {
    user: users.byId[users.current.id],
    conversation,
    typingUsers,
    messages: expand(
      messages, ['byConversation', conversationId],
      message => ({
        ...message,
        author: users.byId[message.author] || {},
      }),
    ),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { conversationId } = ownProps;
  const { messages, ...other } = stateProps;
  return {
    ...ownProps,
    ...other,
    ...dispatchProps,
    messages: withLoader(messages, () => dispatchProps.loadMessages(conversationId)),
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
