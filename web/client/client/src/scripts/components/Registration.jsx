import React, { PropTypes } from 'react';

function triggerComplete(props) {
  const { user, onComplete } = props;
  if (user.username) {
    onComplete();
  }
}

const Registration = React.createClass({
  propTypes: {
    updateProfile: PropTypes.func.isRequired,
  },

  componentWillMount() {
    triggerComplete(this.props);
  },

  componentWillReceiveProps(nextProps) {
    triggerComplete(nextProps);
  },

  onSubmit(event) {
    event.preventDefault();
    const username = this.username.value;
    this.props.updateProfile({ username });
  },

  render() {
    return (
      <div className="registration">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="username">Username:</label>
          {' '}
          <input
            id="username"
            type="text"
            required
            autofocus
            ref={node => this.username = node}
          />
          {' '}
          <input type="submit" value="OK" />
        </form>
      </div>
    );
  },
});

export default Registration;
