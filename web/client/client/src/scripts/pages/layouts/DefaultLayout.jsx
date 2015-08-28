import React, { PropTypes } from 'react';
import NavigationContainer from 'app/containers/NavigationContainer';

const DefaultLayout = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },

  render() {
    return (
      <div className="content">
        <main>{this.props.children}</main>
        <aside><NavigationContainer /></aside>
      </div>
    );
  },
});

export default DefaultLayout;
