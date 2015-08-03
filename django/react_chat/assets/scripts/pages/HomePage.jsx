import React from 'react';
import DocumentTitle from 'react-document-title';
import DefaultLayout from 'app/components/DefaultLayout';

export default React.createClass({
  displayName: 'HomePage',

  render() {
    return (
      <DefaultLayout>
        <DocumentTitle title="Home">
          <div>
            Home
          </div>
        </DocumentTitle>
      </DefaultLayout>
    );
  },
});
