import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
//import { getCurrentConversation } from 'app/utils/conversationStore';
import { loadConversation, loadMessages, sendMessage, sendTyping } from 'app/actions/conversation';
import Chat from 'app/components/Chat';

function mapStateToProps(state, ownProps) {
  const { conversationId } = ownProps;
  const {
    user,
    entities,
    pagination: { messagesByConversation },
  } = state;
  const conversation = entities.conversations[conversationId];
  const messagePagination = messagesByConversation[conversationId] || { ids: [] };
  const messages = messagePagination.ids.map(id => entities.messages[id]);
  return {
    user,
    conversation,
    messages,
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
  };
}

function loadData(props) {
  props.loadConversation(props.conversationId);
  props.loadMessages(props.conversationId);
}

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.string.isRequired,
    conversation: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    // TODO
  },

  componentDidMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.conversationId != this.props.conversationId) {
      loadData(nextProps);
    }
  },

  render() {
    const { conversationId, loadConversation, ...other } = this.props;
    return <Chat {...other} />;
  },
});

export default connect(
  mapStateToProps,
  { loadConversation, loadMessages, sendMessage, sendTyping },
  mergeProps,
)(ChatContainer);
