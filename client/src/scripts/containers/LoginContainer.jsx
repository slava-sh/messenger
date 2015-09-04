import { connect } from 'react-redux';
import { sendCode } from 'app/actions/auth';
import Login from 'app/components/Login';

export default connect(
  null,
  { sendCode },
)(Login);
