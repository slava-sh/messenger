import React from 'react';
import App from './components/App';

window.initialize = function() {
  React.render(React.createElement(App, {}), document.body);
}
