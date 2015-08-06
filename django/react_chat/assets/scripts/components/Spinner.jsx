import React from 'react';

const Spinner = React.createClass({
  render() {
    return (
      <div className="spinner">
        <i className="fa fa-refresh fa-spin fa-3x" />
      </div>
    );
  }
});

export default Spinner;
