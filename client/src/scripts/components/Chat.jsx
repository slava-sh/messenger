import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import MessageList from 'app/components/MessageList';
import MessageForm from 'app/components/MessageForm';
import Spinner from 'app/components/Spinner';

const Chat = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversation: PropTypes.object,
//    messages: collectionShape.isRequired,
    typingUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendTyping: PropTypes.func.isRequired,
  },

  componentDidUpdate() {
    // TODO: only scroll when already at the bottom and a new message has arrived
    // this.scrollToBottom();
  },

  scrollToBottom() {
    if (this.messageList) {
      this.messageList.scrollBottomTo(0);
    }
  },

  render() {
    const {
      user,
      conversation,
      messages,
      typingUsers,
      sendMessage,
      sendTyping,
    } = this.props;
    if (!conversation) {
      return <Spinner smooth />;
    }
    return (
      <div className="chat">
        <DocumentTitle title={conversation.name} />
        <div className="header">
          <span className="username">{conversation.name}</span>
          <a href="#"><i className="fa fa-gear pull-right"></i></a>
        </div>
        <MessageList
          messages={messages}
          typingUsers={typingUsers}
          ref={node => this.messageList = node}
        />
        <div className="message-composer">
          <MessageForm
            user={user}
            sendMessage={sendMessage}
            sendTyping={sendTyping}
          />
        </div>
      </div>
    );
  },
});

export default Chat;
