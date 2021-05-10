import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { LOGIN, ROOT } from 'constants/routes';
import Login from 'routes/login';

import { useStyles } from './app.styles';

const redirectToLogin = (): React.ReactNode => <Redirect to={LOGIN} />;

const UnauthenticatedApp: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.admin}>
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
