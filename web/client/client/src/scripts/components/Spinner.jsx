import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Spinner = React.createClass({
  propTypes: {
    smooth: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      smooth: false,
    };
  },

  render() {
    const { smooth } = this.props;
    const classes = classNames({
      'spinner': true,
      'spinner--smooth': smooth,
    });
    return (
      <div className={classes}>
        <i className="fa fa-refresh fa-spin fa-3x" />
      </div>
    );
  },
});

export default Spinner;
