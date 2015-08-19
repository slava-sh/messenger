import 'babel-core/polyfill';
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import configureStore from 'app/configureStore';
import initializeApiClient from 'app/utils/ApiClient';
import App from 'app/containers/App';

function initialize(state, primusUrl) {
  const store = configureStore(state);
  initializeApiClient(primusUrl, store);
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};

window.initialize = initialize;
