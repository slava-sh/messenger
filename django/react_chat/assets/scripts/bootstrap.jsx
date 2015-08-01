import React from 'react';
import Router, { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';

const routes = (
  <Route path="/react/">
    <DefaultRoute name="home" handler={HomePage} />
    <Route path="c/:id/" name="conversation" handler={ConversationPage} />
  </Route>
);

window.initialize = function() {
  Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler />, document.body);
  });
}
