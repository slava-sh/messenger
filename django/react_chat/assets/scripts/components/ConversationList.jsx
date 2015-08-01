import React from 'react';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import ConversationStore from 'app/stores/ConversationStore';
import ConversationActions from 'app/actions/ConversationActions';

export default React.createClass({
  mixins: [ReactStateMagicMixin],

  statics: {
    registerStores: {
      conversations: ConversationStore,
    },
  },

  componentWillMount() {
    ConversationActions.requestConversations();
  },

  render() {
    let conversations = []
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
