import React, { PropTypes } from 'react';
import Select from 'react-select';

function triggerComplete(props) {
  const { newConversation, onComplete } = props;
  if (newConversation) {
    onComplete(newConversation);
  }
}

const NewConversation = React.createClass({
  propTypes: {
// users: PropTypes.arrayOf(PropTypes.object).isRequired,
    createConversation: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
  },

  componentWillMount() {
    this.props.users.loadMore();
    triggerComplete(this.props);
  },

  componentWillReceiveProps(nextProps) {
    triggerComplete(nextProps);
  },

  onSubmit(event) {
    event.preventDefault();
    const name = this.name.value;
    const members = this.members.state.values.map(value => value.value);
    this.props.createConversation({ name, members });
  },

  render() {
    const { users } = this.props;
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
          <br />
          <label htmlFor="members">Members:</label>
          {' '}
          <Select
            id="members"
            placeholder=""
            multi={true}
            options={users.items.map(user => ({ value: user.id, label: user.username }))}
            ref={node => this.members = node}
          />
          <input type="submit" value="OK" />
        </form>
      </div>
    );
  },
});

export default NewConversation;
