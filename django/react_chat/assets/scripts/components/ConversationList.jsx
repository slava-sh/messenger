import React from 'react';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import ConversationStore from 'app/stores/ConversationStore';
import ConversationActions from 'app/actions/ConversationActions';

export default React.createClass({
  mixins: [ReactStateMagicMixin],

  statics: {
    registerStores: {
      conversations: ConversationStore,
    }
  },

  componentWillMount() {
    ConversationActions.requestConversations();
  },

  render() {
    console.log('render');
    console.log(this.state);
    let conversations = []
    for (let i of '1234567890') {
      conversations.push(
        <div key={i} className="conversation">
          <a href="?">%- conversation.get('name') %</a>
        </div>
      );
    }
    return <div className="conversations">{conversations}</div>;
  },
});
