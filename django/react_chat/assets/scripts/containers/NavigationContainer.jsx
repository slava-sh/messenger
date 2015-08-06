import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestConversations } from 'app/actions/conversation';
import Navigation from 'app/components/Navigation';

const select = state => {
  const { router, user, conversationStore } = state;
  return {
    router,
    user,
    conversations: conversationStore.entries
  };
};

const NavigationContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  componentDidMount() {
    this.props.dispatch(requestConversations());
  },

  render() {
    var { dispatch, ...other } = this.props;
    return <Navigation {...other} />;
  }
});

export default connect(select)(NavigationContainer);
