import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation from 'app/components/Navigation';

export default React.createClass({
  displayName: 'DefaultLayout',

  render() {
    return (
      <DocumentTitle title="React Chat">
        <div className="content">
          <div className="main">
            {this.props.children}
          </div>
          <Navigation />
        </div>
      </DocumentTitle>
    );
  },
});
