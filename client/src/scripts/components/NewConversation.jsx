import React, { PropTypes } from 'react';

function triggerComplete(props) {
  const { newConversation, onComplete } = props;
  if (newConversation) {
    onComplete(newConversation);
  }
}

const NewConversation = React.createClass({
  propTypes: {
    createConversation: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
  },

  componentWillMount() {
    triggerComplete(this.props);
  },

  componentWillReceiveProps(nextProps) {
    triggerComplete(nextProps);
  },

  onSubmit(event) {
    event.preventDefault();
    const name = this.name.value;
    this.props.createConversation({ name });
  },

  render() {
    return (
      <div className="new-conversation">
        <h1>New Conversation</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name:</label>
          {' '}
          <input
            id="name"
            type="text"
            required
            autoFocus
            ref={node => this.name = node}
          />
          {' '}
          <input type="submit" value="OK" />
        </form>
      </div>
    );
  },
});

export default NewConversation;
