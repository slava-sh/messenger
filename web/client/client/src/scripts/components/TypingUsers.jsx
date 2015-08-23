import React, { PropTypes } from 'react';
import { intersperse } from 'app/utils';

const TypingUsers = React.createClass({
  propTypes: {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  },

  render() {
    const { users } = this.props;
    if (users.length === 0) {
      return null;
    }
    return (
      <div className="typing-users">
        {intersperse(users.map(user => (
          <span key={user.id} className="username">{user.username}</span>
        )), ', ')}
        {' '}
        {users.length === 1 ? 'is' : 'are'} typing
        <span className="typing-users__dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    );
  },
});

export default TypingUsers;
