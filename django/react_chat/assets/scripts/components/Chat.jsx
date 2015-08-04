import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import MessageList from 'app/components/MessageList';
import { requestMessages } from 'app/actions/messages';

function select(state) {
  const { messages } = state;
  return {
    messages
  };
}

export default connect(select)(React.createClass({
  displayName: 'Chat',
  propTypes: {
    conversationId: PropTypes.number.isRequired,
  },

  componentDidMount() {
    this.requestData();
  },

  componentWillReceiveProps(newProps) {
    if (newProps.conversationId !== this.props.conversationId) {
      this.requestData();
    }
  },

  requestData() {
// ConversationActions.requestConversation(this.props.conversationId);
    this.props.dispatch(requestMessages(this.props.conversationId));
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
    let conversationName = _.get(this.props, 'conversation.name', '');
    return (
      <DocumentTitle title={conversationName}>
        <div className="chat">
          <div className="header">
            <span className="username">{conversationName}</span>
            <a href="#"><i className="fa fa-gear pull-right"></i></a>
          </div>
          {/*TODO ref="messageList"*/} <MessageList messages={this.props.messages} />
          <div className="new-message">
            <form method="post">
              <div className="username">
                {_.get(this.props, 'currentUser.name', '')}
              </div>
              <div className="text"><textarea name="text" /></div>
              <div><input type="submit" value="Send" /></div>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  },
}));
