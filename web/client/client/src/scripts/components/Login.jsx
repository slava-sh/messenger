import React, { PropTypes } from 'react';

const Login = React.createClass({
  propTypes: {
    sendCode: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      codeSent: false,
    };
  },

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    this.props.sendCode(email);
    this.setState({
      codeSent: true,
      email,
    });
  },

  renderForm() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          required
          autofocus
          ref={node => this.email = node}
        />
      </form>
    );
  },

  renderSent() {
    const { email } = this.state;
    return (
      <div>
        Check your email.
        We have sent you a login link.
      </div>
    );
  },

  render() {
    const { codeSent } = this.state;
    return (
      <div className="login">
        {codeSent ? this.renderSent() : this.renderForm()}
      </div>
    );
  },
});

export default Login;
