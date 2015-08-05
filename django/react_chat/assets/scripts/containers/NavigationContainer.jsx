import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/object/pick';
import Navigation from 'app/components/Navigation';
import { requestConversations } from 'app/actions/conversation';

const select = state => pick(state, 'router', 'user', 'conversations');

const NavigationContainer = React.createClass({
  componentDidMount() {
    this.props.dispatch(requestConversations());
  },

  render() {
    var { dispatch, ...other } = this.props;
    return <Navigation {...other} />;
  }
});

export default connect(select)(NavigationContainer);
