import React, { PropTypes } from 'react';
import { Link as ImpureLink } from 'react-router';

const Link = React.createClass({
  propTypes: {
    router: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  },

  render() {
    const { children, router, ...other } = this.props;
    return <ImpureLink {...other}>{children}</ImpureLink>;
  },
});

export default Link;
