import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from 'routes/login';

import { LOGIN, ROOT } from 'constants/routes';

const redirectToLogin = (): React.ReactNode => <Redirect to={LOGIN} />;

const UnauthenticatedApp: React.SFC = () => {
  return (
    <Router>
      <div className="app unauth">
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={ROOT} render={redirectToLogin} />
        </Switch>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
