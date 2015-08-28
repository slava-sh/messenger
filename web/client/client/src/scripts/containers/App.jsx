import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';
import LoginPage from 'app/pages/LoginPage';

export function createAuthHandler(store) {
  return (nextState, transition) => {
    const { user } = store.getState();
    if (!user.id) {
      transition.to('/login/');
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
        </Route>
      </Router>
    );
  },
});

export default App;
