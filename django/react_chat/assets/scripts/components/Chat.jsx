import _ from 'lodash';
import React, { PropTypes } from 'react';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import MessageList from 'app/components/MessageList';
import ConversationStore from 'app/stores/ConversationStore';
import MessageStore from 'app/stores/MessageStore';
import ConversationActions from 'app/actions/ConversationActions';
import MessageActions from 'app/actions/MessageActions';

export default React.createClass({
  displayName: 'Chat',
  mixins: [FluxyMixin],
  propTypes: {
    conversationId: PropTypes.number.isRequired,
  },

  statics: {
    storeListeners: [ConversationStore, MessageStore],
  },

  getInitialState() {
    return {
      conversation: undefined,
      messages: [],
    };
  },

  getStateFromStores() {
    let conversationId = this.props.conversationId;
    return {
      conversation: ConversationStore.getConversation(conversationId),
      messages: MessageStore.getMessages(conversationId),
    };
  },

  onChange() {
    this.setState(this.getStateFromStores());
  },

  componentDidMount() {
    this.requestData();
  },

  componentWillReceiveProps() {
    this.requestData();
  },

  requestData() {
    ConversationActions.requestConversation(this.props.conversationId);
    MessageActions.requestMessages(this.props.conversationId);
  },

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  },

  scrollToBottom() {
    var messageList = this.refs.messageList.getDOMNode();
    messageList.scrollTop = messageList.scrollHeight;
  },

  render() {
    return (
      <div className="chat">
        <div className="header">
          <span className="username">
            {_.get(this.state, 'conversation.name')}
          </span>
          <a href="#"><i className="fa fa-gear pull-right"></i></a>
        </div>
        <MessageList ref="messageList" messages={this.state.messages} />
        <div className="new-message">
          <form method="post">
            <div className="username">%- App.user %</div>
            <div className="text"><textarea name="text" /></div>
            <div><input type="submit" value="Send" /></div>
          </form>
        </div>
      </div>
    );
  },
});
