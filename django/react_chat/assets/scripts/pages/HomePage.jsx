import React from 'react';
import DocumentTitle from 'react-document-title';
import DefaultLayout from 'app/pages/DefaultLayout';

const HomePage = React.createClass({
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
  }
});

export default HomePage;
