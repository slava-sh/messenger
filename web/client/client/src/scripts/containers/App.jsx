import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';

const App = React.createClass({
  propTypes: {
    routeComponent: PropTypes.func.isRequired, // TODO: find a better way
    history: PropTypes.object.isRequired,
  },

  render() {
    const { routeComponent, history } = this.props;
    return (
      <Router history={history}>
        <Route component={routeComponent}>
          <Route path="/" component={HomePage} />
          <Route path="/c/:id/" component={ConversationPage} />
        </Route>
      </Router>
    );
  },
});

export default App;
