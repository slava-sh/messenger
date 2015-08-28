import React from 'react';
import DocumentTitle from 'react-document-title';
import DefaultLayout from 'app/pages/layouts/DefaultLayout';

const HomePage = React.createClass({
  render() {
    return (
      <DefaultLayout>
        <DocumentTitle title="Home" />
        <div>
          Home
        </div>
      </DefaultLayout>
    );
  },
});

export default HomePage;
