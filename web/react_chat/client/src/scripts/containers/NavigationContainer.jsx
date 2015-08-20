import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversations } from 'app/actions/conversation';
import Navigation from 'app/components/Navigation';

function mapStateToProps(state, ownProps) {
  const {
    router,
    user,
    entities: { conversations },
    pagination,
  } = state;
  const conversationPagination = pagination.conversations.default || { ids: [] };
  return {
    router,
    user,
    conversations: conversationPagination.ids.map(id => conversations[id]),
  };
}

const NavigationContainer = React.createClass({
  propTypes: {
    // TODO
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
