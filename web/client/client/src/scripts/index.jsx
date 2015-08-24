import 'babel-core/polyfill';
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent } from 'redux-react-router';
import createStore from 'app/utils/createStore';
import createPushClient from 'app/utils/createPushClient';
import App from 'app/containers/App';

function initialize(state, primusUrl) {
  window.store = createStore(state);
  window.pushClient = createPushClient(primusUrl, store);
  const RouteComponent = reduxRouteComponent(store);
  const app = <App routeComponent={RouteComponent} history={history} />;
  ReactDOM.render(app, document.getElementById('root'));
}

window.initialize = initialize;
