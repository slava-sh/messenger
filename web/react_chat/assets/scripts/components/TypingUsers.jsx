import React, { PropTypes } from 'react';
import { intersperse } from 'app/utils';

const TypingUsers = React.createClass({
  propTypes: {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired, // TODO: users instead of ids
  },

  render() {
    const { ids } = this.props;
    if (ids.length === 0) {
      return null;
    }
    return (
      <div className="typing-users">
        {intersperse(ids.map(id => (
          <span key={id} className="username">{id}</span>
        )), ', ')}
        {' '}
        {ids.length === 1 ? 'is' : 'are'} typing…
      </div>
    );
  },
});

export default TypingUsers;
