import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';
import LoginPage from 'app/pages/LoginPage';
import RegistrationPage from 'app/pages/RegistrationPage';

export function createAuthHandler(store) {
  return (nextState, transition) => {
    const { userId, entities: { users } } = store.getState();
    if (!userId) {
        transition.to('/login/');
    } else if (!users[userId].username) {
      transition.to('/register/');
    }
  };
}

const App = React.createClass({
  propTypes: {
    ReduxRouteComponent: PropTypes.func.isRequired,
    requireAuth: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  },

  render() {
    const {
      ReduxRouteComponent,
      requireAuth,
      history,
    } = this.props;
    return (
      <Router history={history}>
        <Route component={ReduxRouteComponent}>
          <Route onEnter={requireAuth}>
            <Route path="/" component={HomePage} />
            <Route path="/c/" component={HomePage} />
            <Route path="/c/:id/" component={ConversationPage} />
          </Route>
          <Route path="/login/" component={LoginPage} />
          <Route path="/register/" component={RegistrationPage} />
        </Route>
      </Router>
    );
  },
});

export default App;
