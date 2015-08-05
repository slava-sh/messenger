import React, { PropTypes } from 'react';
import { Link as ImpureLink } from 'react-router';

export const Link = React.createClass({
  propTypes: {
    router: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    return <ImpureLink {...this.props}>{this.props.children}</ImpureLink>;
  }
});

export default Link;
