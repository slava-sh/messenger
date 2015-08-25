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
    pagination: pagination.conversations,
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
    return <Navigation {...this.props} />;
  },
});

export default connect(
  mapStateToProps,
  { loadConversations },
)(NavigationContainer);
