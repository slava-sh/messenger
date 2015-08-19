import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { reduxRouteComponent } from 'redux-react-router';
import HomePage from 'app/pages/HomePage';
import ConversationPage from 'app/pages/ConversationPage';

const App = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
  },

  render() {
    return (
      <Router history={history}>
        <Route component={reduxRouteComponent(this.props.store)}>
          <Route path="/react/" component={HomePage} />
          <Route path="/react/c/:id/" component={ConversationPage} />
        </Route>
      </Router>
    );
  },
});

export default App;
