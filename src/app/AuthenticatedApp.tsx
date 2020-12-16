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
  DUPLICATE,
} from 'constants/routes';
import Home from 'routes/home';
import Questionnaires from 'routes/questionnaires';
import CreateQuestionnaires from 'routes/questionnaires/create';
import EditQuestionnaire from 'routes/questionnaires/edit';
import Responses from 'routes/questionnaires/responses';
import Programmes from 'routes/programmes';
import CreateProgrammes from 'routes/programmes/create';
import Classes from 'routes/programmes/classes';
import Students from 'routes/students';
import CreateStudents from 'routes/students/create';
import DuplicateQuestionnaire from 'routes/questionnaires/duplicate';

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
          <Route path={`${QUESTIONNAIRES}/:id${DUPLICATE}`}>
            <DuplicateQuestionnaire />
          </Route>
          <Route path={`${QUESTIONNAIRES}/:id${RESPONSES}`}>
            <Responses />
          </Route>
          <Route exact path={PROGRAMMES} component={Programmes} />
          <Route
            exact
            path={`${PROGRAMMES}${CREATE}`}
            component={CreateProgrammes}
          />
          <Route path={`${PROGRAMMES}/:id${CLASSES}`}>
            <Classes />
          </Route>
          <Route exact path={CLASSES} component={Home} />
          <Route exact path={STUDENTS} component={Students} />
          <Route
            exact
            path={`${STUDENTS}${CREATE}`}
            component={CreateStudents}
          />
          <Route path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
