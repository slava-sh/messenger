import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import DocumentTitle from 'react-document-title';
import MessageList from 'app/components/MessageList';
import Spinner from 'app/components/Spinner';

const MessageForm = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired
  },

  onSubmit(event) {
    event.preventDefault();
    const text = this.textarea.value;
    if (text) {
      this.props.sendMessage(text);
    }
    this.textarea.value = '';
  },

  onKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.onSubmit(event);
    }
  },

  render() {
    const { user } = this.props;
    return (
      <div className="new-message">
        <form onSubmit={this.onSubmit}>
          <div className="username">{user.name}</div>
          <div className="text">
            <textarea
              ref={node => this.textarea = node}
              onKeyDown={this.onKeyDown}
            />
          </div>
          <div><input type="submit" value="Send" /></div>
        </form>
      </div>
    );
  }
});

export default MessageForm;
