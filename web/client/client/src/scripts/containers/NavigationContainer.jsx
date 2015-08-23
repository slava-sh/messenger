import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversations } from 'app/actions/conversation';
import Navigation from 'app/components/Navigation';

function mapStateToProps(state) {
  const {
    router,
    user,
    entities: { conversations },
    pagination,
  } = state;
  return {
    router,
    user,
    conversations: pagination.conversations.ids.map(id => conversations[id]),
  };
}

const NavigationContainer = React.createClass({
  propTypes: {
    loadConversations: PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.props.loadConversations();
  },

  render() {
    const { loadConversations, ...other } = this.props;
    return <Navigation {...other} />;
  },
});

export default connect(
  mapStateToProps,
  { loadConversations },
)(NavigationContainer);
