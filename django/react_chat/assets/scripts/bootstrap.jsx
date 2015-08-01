import React from 'react';
import Router, { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from 'app/components/App';

const routes = (
  <Route path="/react/">
    <DefaultRoute name="home" handler={App} />
    <Route path="c/:id/" name="conversation" handler={App} />
  </Route>
);

window.initialize = function() {
  Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler />, document.body);
  });
}
