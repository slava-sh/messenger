import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import NavigationContainer from 'app/containers/NavigationContainer';

const DefaultLayout = React.createClass({
  propTypes: {
    children: PropTypes.node
  },

  render() {
    return (
      <DocumentTitle title="React Chat">
        <div className="content">
          <div className="main">{this.props.children}</div>
          <NavigationContainer />
        </div>
      </DocumentTitle>
    );
  }
});

export default DefaultLayout;
