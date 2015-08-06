import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/object/pick';
import Chat from 'app/components/Chat';
import { selectConversation } from 'app/actions/conversation';

const select = state => pick(state, 'user', 'conversation');

const ChatContainer = React.createClass({
  propTypes: {
    conversationId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  componentDidMount() {
    const { dispatch, conversationId } = this.props;
    dispatch(selectConversation(conversationId));
  },

  componentWillReceiveProps(newProps) {
    const { dispatch, conversationId } = this.props;
    dispatch(selectConversation(newProps.conversationId));
  },

  render() {
    const { dispatch, conversationId, ...other } = this.props;
    return <Chat {...other} />;
  }
});

export default connect(select)(ChatContainer);
