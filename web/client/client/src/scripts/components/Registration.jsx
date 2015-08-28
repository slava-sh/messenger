import React, { PropTypes } from 'react';

const Registration = React.createClass({
  propTypes: {
    updateProfile: PropTypes.func.isRequired,
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
