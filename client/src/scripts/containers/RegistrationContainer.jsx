import { connect } from 'react-redux';
import { transitionTo } from 'redux-react-router';
import { updateProfile } from 'app/actions/auth';
import Registration from 'app/components/Registration';

function mapStateToProps(state) {
  const { users } = state;
  return {
    user: users.byId[users.current.id],
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { user: { id: userId } } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    updateProfile: data => dispatchProps.updateProfile({ userId, data }),
    onComplete: () => dispatchProps.transitionTo('/'),
  };
}

export default connect(
  mapStateToProps,
  { updateProfile, transitionTo },
  mergeProps,
)(Registration);
