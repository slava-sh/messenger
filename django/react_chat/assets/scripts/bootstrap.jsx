import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import HomePage from 'app/pages/HomePage';
//import ConversationPage from 'app/pages/ConversationPage';

const HomePage = React.createClass({
  render() {
    return <div>Home</div>;
  }
});

const ConversationPage = React.createClass({
  render() {
    return <div>Conversation</div>;
  }
});

window.initialize = function(snapshot) {
  // TODO: bootstrap(snapshot);
  function reducer(state = {}, action) {
    return {
      router: routerStateReducer(state.router, action)
    };
  }
  let store = createStore(reducer);
  ReactDOM.render((
    <Router history={history}>
      <Route component={reduxRouteComponent(store)}>
        <Route path="/react/" name="home" component={HomePage} />
        <Route path="/react/c/:id/" name="conversation" component={ConversationPage} />
      </Route>
    </Router>
  ), document.querySelector('.container'));
  window.Router = Router;
  window.store = store;
}
