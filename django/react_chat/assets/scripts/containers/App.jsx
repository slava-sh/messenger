import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent, routerStateReducer as router } from 'redux-react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import user from 'app/reducers/user';
import conversations from 'app/reducers/conversations';
import messages from 'app/reducers/messages';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';

export function createApp(state) {
  const reducer = combineReducers({
    router,
    user,
    conversations,
    messages
  });
  const store = applyMiddleware(thunk)(createStore)(reducer, state);
  return <App store={store} />;
}

export const App = React.createClass({
  render() {
    return (
      <Router history={history}>
        <Route component={reduxRouteComponent(this.props.store)}>
          <Route path="/react/" component={HomePage} />
          <Route path="/react/c/:id/" component={ConversationPage} />
        </Route>
      </Router>
    );
  }
});

export default App;
