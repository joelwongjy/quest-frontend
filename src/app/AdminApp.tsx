import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import {
  ADD,
  ADMINS,
  CLASSES,
  CREATE,
  DUPLICATE,
  EDIT,
  HOME,
  PROFILE,
  PROGRAMMES,
  QUESTIONNAIRES,
  QUESTS,
  RESPONSES,
  ROOT,
  STUDENTS,
  TEACHERS,
  UNAUTHED_ROUTES,
} from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import Admins from 'routes/admins';
import CreateAdmin from 'routes/admins/create';
import EditAdmins from 'routes/admins/edit';
import Home from 'routes/home';
import Profile from 'routes/profile';
import Programmes from 'routes/programmes';
import Classes from 'routes/programmes/classes';
import CreateClass from 'routes/programmes/classes/create';
import ClassStudents from 'routes/programmes/classes/students/';
import AddStudents from 'routes/programmes/classes/students/add';
import CreateProgrammes from 'routes/programmes/create';
import Questionnaires from 'routes/questionnaires';
import CreateQuestionnaires from 'routes/questionnaires/create';
import DuplicateQuestionnaire from 'routes/questionnaires/duplicate';
import EditQuestionnaire from 'routes/questionnaires/edit';
import Responses from 'routes/questionnaires/responses';
import Quests from 'routes/quests';
import QuestAttempt from 'routes/quests/attempt';
import Students from 'routes/students';
import CreateStudents from 'routes/students/create';
import EditStudents from 'routes/students/edit';
import UploadStudents from 'routes/students/upload';
import Teachers from 'routes/teachers';
import CreateTeacher from 'routes/teachers/create';
import EditTeachers from 'routes/teachers/edit';

import { useStyles } from './app.styles';

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToHome = (): React.ReactNode => <Redirect to={HOME} />;

const AdminApp: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  const { setHasError } = useError();
  const classes = useStyles();

  useEffect(() => {
    setHasError(false);
  }, [pathname]);

  return (
    <Router>
      <div className={classes.admin}>
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
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
          <Route
            exact
            path={`${PROGRAMMES}/:id${QUESTIONNAIRES}`}
            component={Questionnaires}
          />
          <Route exact path={`${PROGRAMMES}/:id${CLASSES}`}>
            <Classes />
          </Route>
          <Route path={`${PROGRAMMES}/:id${CLASSES}${CREATE}`}>
            <CreateClass />
          </Route>
          <Route
            exact
            path={`${PROGRAMMES}/:id${CLASSES}/:classId${QUESTIONNAIRES}`}
            component={Questionnaires}
          />
          <Route exact path={`${PROGRAMMES}/:id${CLASSES}/:classId${STUDENTS}`}>
            <ClassStudents />
          </Route>
          <Route path={`${PROGRAMMES}/:id${CLASSES}/:classId${STUDENTS}${ADD}`}>
            <AddStudents />
          </Route>
          <Route exact path={CLASSES} component={Home} />
          <Route exact path={STUDENTS} component={Students} />
          <Route
            exact
            path={`${STUDENTS}${CREATE}`}
            component={CreateStudents}
          />
          <Route exact path={`${STUDENTS}${ADD}`} component={UploadStudents} />
          <Route
            exact
            path={`${STUDENTS}/:id${EDIT}`}
            component={EditStudents}
          />
          <Route exact path={TEACHERS} component={Teachers} />
          <Route
            exact
            path={`${TEACHERS}${CREATE}`}
            component={CreateTeacher}
          />
          <Route
            exact
            path={`${TEACHERS}/:id${EDIT}`}
            component={EditTeachers}
          />
          <Route exact path={ADMINS} component={Admins} />
          <Route exact path={`${ADMINS}${CREATE}`} component={CreateAdmin} />
          <Route exact path={`${ADMINS}/:id${EDIT}`} component={EditAdmins} />
          <Route path={HOME} component={Home} />
          <Route exact path={QUESTS} component={Quests} />
          <Route exact path={PROFILE} component={Profile} />
          <Route path={`${QUESTS}/:id/window/:windowId`}>
            <QuestAttempt />
          </Route>
          <Route path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default AdminApp;
