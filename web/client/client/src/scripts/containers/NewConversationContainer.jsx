import { connect } from 'react-redux';
import { transitionTo } from 'redux-react-router';
import { createConversation } from 'app/actions/conversation';
import NewConversation from 'app/components/NewConversation';

function mapStateToProps(state) {
  const { newConversation } = state;
  return { newConversation };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onComplete: conversation => dispatchProps.transitionTo(`/c/${conversation.id}/`),
  };
}


export default connect(
  mapStateToProps,
  { createConversation, transitionTo },
  mergeProps,
)(NewConversation);
