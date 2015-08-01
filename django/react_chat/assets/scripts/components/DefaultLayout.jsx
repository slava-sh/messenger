import React, { PropTypes } from 'react';
import Navigation from 'app/components/Navigation';

export default React.createClass({
  displayName: 'DefaultLayout',
  propTypes: {
    main: PropTypes.any.isRequired,
  },

  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="main">
            {this.props.children}
          </div>
          <Navigation />
        </div>
      </div>
    );
  },
});
