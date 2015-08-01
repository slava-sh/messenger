import React from 'react';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import ConversationStore from 'app/stores/ConversationStore';
import ConversationActions from 'app/actions/ConversationActions';

export default React.createClass({
  displayName: 'ConversationList',
  mixins: [FluxyMixin],

  statics: {
    storeListeners: [ConversationStore],
  },

  onChange() {
    this.updateState();
  },

  updateState() {
    this.setState({
      conversations: ConversationStore.getConversations(),
    });
  },

  componentWillMount() {
    this.updateState();
  },

  componentDidMount() {
    ConversationActions.requestConversations();
  },

  render() {
    let conversations = [];
    for (let conversation of this.state.conversations) {
      conversations.push(
        <div key={conversation.id} className="conversation">
          <a href="?">{conversation.name}</a>
        </div>
      );
    }
    return <div className="conversations">{conversations}</div>;
  },
});
