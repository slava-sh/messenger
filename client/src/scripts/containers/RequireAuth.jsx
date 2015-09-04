import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUser } from 'app/actions/auth';
import { transitionTo } from 'redux-react-router';
import { expandSingleton } from 'app/utils/pagination';
import Spinner from 'app/components/Spinner';

function mapStateToProps(state) {
  const { users } = state;
  return {
    user: expandSingleton(users, 'current'),
  };
}

const RequireAuth = React.createClass({
  propTypes: {
    loadUser: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      hasUser: false,
    };
  },

  componentWillMount() {
    this.checkAuth(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  },

  checkAuth({ user, loadUser, transitionTo }) {
    if (!user.isLoaded) {
      loadUser();
    } else if (user.id === 'anonymous') {
      transitionTo('/login/');
    } else if (!user.username) {
      transitionTo('/register/');
    } else {
      this.setState({ hasUser: true });
    }
  },

  render() {
    const { hasUser } = this.state;
    // We don't just use `user.isLoaded` because one `render` still happens
    // after the `transitionTo` call.
    if (!hasUser) {
      return <Spinner smooth />;
    }
    return this.props.children;
  },
});

export default connect(
  mapStateToProps,
  { loadUser, transitionTo },
)(RequireAuth);
