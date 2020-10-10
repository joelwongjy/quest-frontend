import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { UNAUTHED_ROUTES, ROOT, HOME } from 'constants/routes';
import Home from 'routes/home';

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToHome = (): React.ReactNode => <Redirect to={HOME} />;

const AuthenticatedApp: React.FunctionComponent = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
          <Route exact path={HOME} component={Home} />
          <Route exact path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
