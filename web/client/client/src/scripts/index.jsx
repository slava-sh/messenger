import 'babel-core/polyfill';
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent } from 'redux-react-router';
import createStore from 'app/utils/createStore';
import createPushClient from 'app/utils/createPushClient';
import App, { createAuthHandler } from 'app/containers/App';

function initialize(state, primusUrl) {
  window.store = createStore(state);
  window.pushClient = createPushClient(primusUrl, store);
  const ReduxRouteComponent = reduxRouteComponent(store);
  const requireAuth = createAuthHandler(store);
  const app = (
    <App
      ReduxRouteComponent={ReduxRouteComponent}
      requireAuth={requireAuth}
      history={history}
    />
  );
  ReactDOM.render(app, document.getElementById('root'));
}

window.initialize = initialize;
