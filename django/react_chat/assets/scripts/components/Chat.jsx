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
    storeListeners: [ConversationStore],
  },

  getInitialState() {
    return {
      conversation: {
        name: null,
      },
      messages: [],
    };
  },

  getState() {
    let conversationId = this.props.conversationId;
    return {
      conversation: ConversationStore.getConversation(conversationId),
      messages: MessageStore.getMessages(conversationId),
    };
  },

  onChange() {
    this.setState(this.getState());
  },

  componentDidMount() {
    ConversationActions.requestConversation(this.props.conversationId);
    MessageActions.requestMessages(this.props.conversationId);
  },

  render() {
    return (
      <div className="chat">
        <div className="header">
          <span className="username">{this.state.conversation.name}</span>
          <a href="#"><i className="fa fa-gear pull-right"></i></a>
        </div>
        <MessageList messages={this.state.messages} />
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
