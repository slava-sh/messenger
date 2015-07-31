import React from 'react';
import Chat from './Chat';
import Navigation from './Navigation';

export default React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="content">
          <Chat />
          <Navigation />
        </div>
      </div>
    );
  }
});
