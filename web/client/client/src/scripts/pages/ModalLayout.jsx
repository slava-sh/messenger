import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

const ModalLayout = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },

  render() {
    return (
      <DocumentTitle title="React Chat">
        <div className="content">
          <main>{this.props.children}</main>
        </div>
      </DocumentTitle>
    );
  },
});

export default ModalLayout;
