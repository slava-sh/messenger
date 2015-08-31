import { connect } from 'react-redux';
import { loadConversations } from 'app/actions/conversation';
import Collection from 'app/utils/Collection';
import Navigation from 'app/components/Navigation';

function mapStateToProps(state) {
  const { router, users, conversations } = state;
  return {
    router,
    user: users.byId[users.current.id],
    conversations: conversations.byId,
    conversationPagination: conversations.all,
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
