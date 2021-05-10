import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import {
  CASTLE,
  PROFILE,
  QUESTS,
  ROOT,
  UNAUTHED_ROUTES,
} from 'constants/routes';
import Castle from 'routes/castle';
import Profile from 'routes/profile';
import Quests from 'routes/quests';
import Attempt from 'routes/quests/attempt';
import Attempted from 'routes/quests/attempt/Attempted';

import { useStyles } from './app.styles';

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToCastle = (): React.ReactNode => <Redirect to={CASTLE} />;

const StudentApp: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.student}>
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
          <Route path={CASTLE} component={Castle} />
          <Route exact path={QUESTS} component={Quests} />
          <Route exact path={PROFILE} component={Profile} />
          <Route path={`${QUESTS}/:id/window/:windowId`}>
            <Attempt />
          </Route>
          <Route path={`${QUESTS}/attempt/:id`}>
            <Attempted />
          </Route>
          <Route path="/" render={redirectToCastle} />
        </Switch>
      </div>
    </Router>
  );
};

export default StudentApp;
