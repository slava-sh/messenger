import React from 'react';
import ReactDOM from 'react-dom';
import { createApp } from 'app/App';

window.initialize = function(state) {
  ReactDOM.render(createApp(state), document.querySelector('.container'));
}
