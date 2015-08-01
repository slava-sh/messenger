import React, { PropTypes } from 'react';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import Message from 'app/components/Message';
import ConversationStore from 'app/stores/ConversationStore';
import ConversationActions from 'app/actions/ConversationActions';

export default React.createClass({
  displayName: 'MessageList',
  propTypes: {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  },

  render() {
    return (
      <div className="messages">
        {this.props.messages.map((message) => {
          return <Message key={message.id} message={message} />
        })}
      </div>
    );
  },
});
