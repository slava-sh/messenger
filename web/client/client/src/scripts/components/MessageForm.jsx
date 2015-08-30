import React, { PropTypes } from 'react';

function hasModifier(event) {
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

const MessageForm = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendTyping: PropTypes.func.isRequired,
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
    if (event.key === 'Enter' && !hasModifier(event)) {
      this.onSubmit(event);
    }
  },

  render() {
    const { user, sendTyping } = this.props;
    return (
      <form className="message message--new" onSubmit={this.onSubmit}>
        <div className="message__avatar">
          <img src={user.avatarUrl} />
        </div>
        <div className="message__body">
          <div className="message__author">
            <span className="username">{user.username}</span>
          </div>
          <textarea
            className="message__text"
            ref={node => this.textarea = node}
            onKeyDown={this.onKeyDown}
            onKeyPress={sendTyping}
          />
        </div>
      </form>
    );
  },
});

export default MessageForm;
