import 'babel-core/polyfill';
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent } from 'redux-react-router';
import configureStore from 'app/store/configureStore';
import initializeApiClient from 'app/utils/ApiClient';
import App from 'app/containers/App';

function initialize(state, primusUrl) {
  const store = configureStore(state);
  initializeApiClient(primusUrl, store);
  const RouteComponent = reduxRouteComponent(store);
  const app = <App routeComponent={RouteComponent} history={history} />;
  ReactDOM.render(app, document.getElementById('root'));
  if (DEBUG) {
    window.store = store;
  }
}

window.initialize = initialize;
