import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent } from 'redux-react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import router from 'app/reducers/router';
import user from 'app/reducers/user';
import conversationStore from 'app/reducers/conversationStore';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';

export function createApp(state) {
  const reducer = combineReducers({
    router,
    user,
    conversationStore,
  });
  const store = applyMiddleware(thunk)(createStore)(reducer, state);
  return <App store={store} />;
}

const App = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
  },

  render() {
    return (
      <Router history={history}>
        <Route component={reduxRouteComponent(this.props.store)}>
          <Route path="/react/" component={HomePage} />
          <Route path="/react/c/:id/" component={ConversationPage} />
        </Route>
      </Router>
    );
  },
});

export default App;
