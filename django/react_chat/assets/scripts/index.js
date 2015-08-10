import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { createApp } from 'app/App';
import { bindActions } from 'app/utils/ApiClient';

window.initialize = function initialize(state, socketUrl) {
  const app = createApp(state);
  bindActions(socketUrl, state.user.id, app.props.store.dispatch);
  ReactDOM.render(app, document.querySelector('.container'));
};
