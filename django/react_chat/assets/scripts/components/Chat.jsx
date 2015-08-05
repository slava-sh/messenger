import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import MessageList from 'app/components/MessageList';
import { requestMessages } from 'app/actions/message';

const Chat = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    conversation: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired
  },

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  },

  scrollToBottom() {
    return;
    var messageList = React.findDOMNode(this.refs.messageList);
    messageList.scrollTop = messageList.scrollHeight;
  },

  render() {
    const { user, conversation, messages } = this.props;
    return (
      <DocumentTitle title={conversation.name}>
        <div className="chat">
          <div className="header">
            <span className="username">{conversation.name}</span>
            <a href="#"><i className="fa fa-gear pull-right"></i></a>
          </div>
          {/*TODO ref="messageList"*/} <MessageList messages={messages} />
          <div className="new-message">
            <form method="post">
              <div className="username">{user.name}</div>
              <div className="text"><textarea name="text" /></div>
              <div><input type="submit" value="Send" /></div>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  },
});

export default Chat;
