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
  HOME,
  QUESTIONNAIRES,
  PROGRAMMES,
  CLASSES,
  STUDENTS,
  CREATE,
  RESPONSES,
  EDIT,
} from 'constants/routes';
import Home from 'routes/home';
import Questionnaires from 'routes/questionnaires';
import CreateQuestionnaires from 'routes/questionnaires/create';
import EditQuestionnaire from 'routes/questionnaires/edit';
import Responses from 'routes/questionnaires/responses';

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToHome = (): React.ReactNode => <Redirect to={HOME} />;

const AuthenticatedApp: React.FunctionComponent = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
          <Route path={HOME} component={Home} />
          <Route exact path={QUESTIONNAIRES} component={Questionnaires} />
          <Route
            exact
            path={`${QUESTIONNAIRES}${CREATE}`}
            component={CreateQuestionnaires}
          />
          <Route path={`${QUESTIONNAIRES}/:id${EDIT}`}>
            <EditQuestionnaire />
          </Route>
          <Route path={`${QUESTIONNAIRES}/:id${RESPONSES}`}>
            <Responses />
          </Route>
          <Route exact path={PROGRAMMES} component={Home} />
          <Route exact path={CLASSES} component={Home} />
          <Route exact path={STUDENTS} component={Home} />
          <Route path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
