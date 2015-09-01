import { connect } from 'react-redux';
import { loadConversations } from 'app/actions/conversation';
import { expand, withLoader } from 'app/utils/pagination';
import Navigation from 'app/components/Navigation';

function mapStateToProps(state) {
  const { router, users, conversations } = state;
  return {
    router,
    user: users.byId[users.current.id],
    conversations: expand(conversations),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    conversations: withLoader(stateProps.conversations, dispatchProps.loadConversations),
  };
}

export default connect(
  mapStateToProps,
  { loadConversations },
  mergeProps,
)(Navigation);
