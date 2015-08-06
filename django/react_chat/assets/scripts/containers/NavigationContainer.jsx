import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/object/pick';
import Navigation from 'app/components/Navigation';
import { requestConversations } from 'app/actions/conversation';

const select = state => {
  const { router, user, conversation } = state;
  return {
    router,
    user,
    conversations: conversation.entries
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
