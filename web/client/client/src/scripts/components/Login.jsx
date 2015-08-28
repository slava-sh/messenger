import React, { PropTypes } from 'react';

const Login = React.createClass({
  propTypes: {
    sendCode: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      emailSent: false,
    };
  },

  onSubmit(event) {
    event.preventDefault();
    this.props.sendCode(this.email.value);
    this.setState({ emailSent: true });
  },

  render() {
    const { emailSent } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.onSubmit}>
          Email:
          <input
            type="email"
            disabled={emailSent}
            required
            autofocus
            ref={node => this.email = node}
          />
        </form>
      </div>
    );
  },
});

export default Login;
