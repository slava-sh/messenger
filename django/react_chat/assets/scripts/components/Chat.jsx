import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import DocumentTitle from 'react-document-title';
import MessageList from 'app/components/MessageList';
import MessageForm from 'app/components/MessageForm';
import Spinner from 'app/components/Spinner';

const Chat = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversation: PropTypes.object,
    sendMessage: PropTypes.func.isRequired
  },

  componentDidUpdate() {
    this.scrollToBottom();
  },

  scrollToBottom() {
    var messageList = findDOMNode(this.messageList);
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  },

  render() {
    const { user, conversation, sendMessage } = this.props;
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
            messages={conversation.messages}
            ref={node => this.messageList = node}
          />
          <MessageForm user={user} sendMessage={sendMessage} />
        </div>
      </DocumentTitle>
    );
  }
});

export default Chat;
