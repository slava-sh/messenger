import { connect } from 'react-redux';
import { transitionTo } from 'redux-react-router';
import { loadUsers } from 'app/actions/auth';
import { createConversation } from 'app/actions/conversation';
import { expand, withLoader } from 'app/utils/pagination';
import NewConversation from 'app/components/NewConversation';

function mapStateToProps(state) {
  const { newConversation, users } = state;
  return {
    newConversation,
    users: expand(users),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    users: withLoader(stateProps.users, dispatchProps.loadUsers),
    onComplete: conversation => dispatchProps.transitionTo(`/c/${conversation.id}/`),
  };
}


export default connect(
  mapStateToProps,
  { createConversation, loadUsers, transitionTo },
  mergeProps,
)(NewConversation);
