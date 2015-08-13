import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pick from 'lodash/object/pick';
import { getCurrentConversation } from 'app/utils/conversationStore';
import { selectConversation, sendMessage, sendTyping } from 'app/actions/conversation';
import Chat from 'app/components/Chat';

const select = state => pick(state, 'user', 'conversationStore');

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    conversationStore: PropTypes.object,
  },

  componentDidMount() {
    const { dispatch, conversationId } = this.props;
    dispatch(selectConversation(conversationId));
  },

  componentWillReceiveProps(newProps) {
    const { dispatch } = this.props;
    dispatch(selectConversation(newProps.conversationId));
  },

  render() {
    const { dispatch, conversationId, conversationStore, ...other } = this.props;
    const conversation = getCurrentConversation(conversationStore);
    const actions = bindActionCreators({ sendMessage, sendTyping }, dispatch);
    return <Chat {...other} {...actions} conversation={conversation} />;
  },
});

export default connect(select)(ChatContainer);
