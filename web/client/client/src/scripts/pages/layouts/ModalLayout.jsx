import React, { PropTypes } from 'react';

const ModalLayout = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },

  render() {
    return (
      <div className="content">
        <main>{this.props.children}</main>
      </div>
    );
  },
});

export default ModalLayout;
