import { connect } from 'react-redux';
import { loadConversations } from 'app/actions/conversation';
import { expand, identity, withLoaders } from 'app/utils/pagination';
import Navigation from 'app/components/Navigation';

function mapStateToProps(state) {
  const { router, users, conversations } = state;
  return {
    router,
    user: users.byId[users.current.id],
    conversations: expand(conversations, {
      all: identity,
    }),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    conversations: withLoaders(stateProps.conversations, {
      all: dispatchProps.loadConversations,
    }),
  };
}

export default connect(
  mapStateToProps,
  { loadConversations },
  mergeProps,
)(Navigation);
