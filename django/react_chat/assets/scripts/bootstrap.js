import React from 'react';
import App from 'app/components/App';

window.initialize = function() {
  React.render(React.createElement(App, {}), document.body);
}
