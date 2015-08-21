import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
//import { getCurrentConversation } from 'app/utils/conversationStore';
import { loadConversation, loadMessages, sendMessage, sendTyping } from 'app/actions/conversation';
import Chat from 'app/components/Chat';

function mapStateToProps(state, ownProps) {
  const { conversationId } = ownProps;
  const {
    user,
    entities: { conversations, messages },
    pagination: { messagesByConversation },
  } = state;
  const messagePagination = messagesByConversation[conversationId] || { ids: [] };
  return {
    user,
    conversation: conversations[conversationId],
    messages: messagePagination.ids.map(id => messages[id]),
  };
}

function loadData(props) {
  props.loadConversation(props.conversationId);
  props.loadMessages(props.conversationId);
}

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.number.isRequired,
    conversation: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    // TODO
  },

  componentDidMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.conversationId != this.props.conversationId) {
      loadData(this.props);
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
)(ChatContainer);
