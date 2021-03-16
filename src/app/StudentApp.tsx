import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  UNAUTHED_ROUTES,
  ROOT,
  QUESTS,
  CASTLE,
  PROFILE,
} from 'constants/routes';
import Quests from 'routes/quests';
import QuestAttempt from 'routes/quests/attempt';
import Castle from 'routes/castle';
import Profile from 'routes/profile';
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
            <QuestAttempt />
          </Route>
          <Route path="/" render={redirectToCastle} />
        </Switch>
      </div>
    </Router>
  );
};

export default StudentApp;
