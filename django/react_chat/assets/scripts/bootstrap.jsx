import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import conversations from 'app/reducers/conversations';
import messages from 'app/reducers/messages';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';

window.initialize = function(snapshot) {
  // TODO: bootstrap(snapshot);
  const reducer = combineReducers({
    router: routerStateReducer,
    conversations,
    messages
  });
  const store = applyMiddleware(thunk)(createStore)(reducer);
  ReactDOM.render((
    <Router history={history}>
      <Route component={reduxRouteComponent(store)}>
        {/* TODO: named routes and reverse lookups */}
        <Route path="/react/" component={HomePage} />
        <Route path="/react/c/:id/" component={ConversationPage} />
      </Route>
    </Router>
  ), document.querySelector('.container'));
  window.Router = Router;
  window.RD = ReactDOM;
  window.store = store;
}
