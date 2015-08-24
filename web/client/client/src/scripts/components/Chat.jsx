import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import DocumentTitle from 'react-document-title';
import MessageList from 'app/components/MessageList';
import TypingUsers from 'app/components/TypingUsers';
import MessageForm from 'app/components/MessageForm';
import Spinner from 'app/components/Spinner';

const Chat = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversation: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    typingUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendTyping: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
  },

  componentDidUpdate() {
    this.scrollToBottom();
  },

  scrollToBottom() {
    const messageList = findDOMNode(this.messageList);
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
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
      loadMessages,
    } = this.props;
    if (!conversation) {
      return <Spinner />;
    }
    return (
      <DocumentTitle title={conversation.name}>
        <div className="chat">
          <div className="header">
            <span className="username">{conversation.name}</span>
            <a href="#"><i className="fa fa-gear pull-right"></i></a>
          </div>
          <MessageList
            messages={messages}
            loadMore={loadMessages}
            ref={node => this.messageList = node}
          />
          <TypingUsers users={typingUsers} />
          <MessageForm
            user={user}
            sendMessage={sendMessage}
            sendTyping={sendTyping}
          />
        </div>
      </DocumentTitle>
    );
  },
});

export default Chat;
