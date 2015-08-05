import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/object/pick';
import Chat from 'app/components/Chat';
import { requestMessages } from 'app/actions/message';

const select = state => pick(state, 'user', 'conversations', 'messages');

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.number.isRequired
  },

  componentDidMount() {
    this.requestData();
  },

  componentWillReceiveProps(newProps) {
    if (newProps.conversationId !== this.props.conversationId) {
      this.requestData();
    }
  },

  requestData() {
    const { dispatch, conversationId } = this.props;
    // TODO: dispatch(requestConversation(conversationId));
    dispatch(requestMessages(conversationId));
  },

  render() {
    const { dispatch, conversationId, ...other } = this.props;
    // TODO: props.conversation
    return <Chat {...other} conversation={{name: '?'}} />;
  }
});

export default connect(select)(ChatContainer);
