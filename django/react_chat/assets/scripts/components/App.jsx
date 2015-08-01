import React from 'react';
import Chat from 'app/components/Chat';
import Navigation from 'app/components/Navigation';

export default React.createClass({
  render() {
    return (
      <div className="container">
        <div className="content">
          <Chat />
          <Navigation />
        </div>
      </div>
    );
  },
});
