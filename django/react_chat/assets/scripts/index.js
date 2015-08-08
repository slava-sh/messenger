import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { createApp } from 'app/App';
import socketClient from 'socket.io-client';
import { bindActions } from 'app/utils/ApiClient';

window.initialize = function initialize(state) {
  window.socket = socketClient('http://localhost:3000');

  const app = createApp(state);
  bindActions(app.props.store.dispatch);
  ReactDOM.render(app, document.querySelector('.container'));

  socket.on('connect',    function() { console.log('connected',  arguments); }); // eslint-disable-line
  socket.on('event',      function() { console.log('event',      arguments); }); // eslint-disable-line
  socket.on('disconnect', function() { console.log('disconnect', arguments); }); // eslint-disable-line
};
