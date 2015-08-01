import React from 'react';
import { Link } from 'react-router';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import ConversationStore from 'app/stores/ConversationStore';
import ConversationActions from 'app/actions/ConversationActions';

function getState() {
  return {
    conversations: ConversationStore.getConversations(),
  };
}

export default React.createClass({
  displayName: 'ConversationList',
  mixins: [FluxyMixin],

  statics: {
    storeListeners: [ConversationStore],
  },

  getInitialState: getState,

  onChange() {
    this.setState(getState());
  },

  componentDidMount() {
    ConversationActions.requestConversations();
  },

  render() {
    let conversations = [];
    for (let conversation of this.state.conversations) {
      conversations.push(
        <div key={`${conversation.id}`} className="conversation">
          <Link to="conversation" params={{id: conversation.id}} activeClass="active">
            {conversation.name}
          </Link>
        </div>
      );
    }
    return <div className="conversations">{conversations}</div>;
  },
});
