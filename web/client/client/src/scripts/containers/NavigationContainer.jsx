import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConversations } from 'app/actions/conversation';
import Collection from 'app/utils/Collection';
import Navigation from 'app/components/Navigation';

function mapStateToProps(state) {
  const {
    router,
    user,
    entities: { conversations },
    pagination: { conversations: conversationPagination },
  } = state;
  return {
    router,
    user,
    conversations,
    conversationPagination,
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    conversations: new Collection(
      stateProps.conversationPagination,
      stateProps.conversations,
      dispatchProps.loadConversations,
    ),
  };
}

export default connect(
  mapStateToProps,
  { loadConversations },
  mergeProps,
)(Navigation);
