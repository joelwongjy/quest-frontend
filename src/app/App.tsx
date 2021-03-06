import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { LocalizationProvider } from '@material-ui/pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
import dateFnsUtils from '@material-ui/pickers/adapter/date-fns';

import Loading from 'components/loading';
import { useUser } from 'contexts/UserContext';
import { adminTheme, studentTheme } from 'styles/theme';
import { retryPromise } from 'utils/promiseUtils';

// Code splitting with React.lazy and Suspense
type ModuleType = typeof import('./AdminApp');

const loadAdminApp = (): Promise<ModuleType> => import('./AdminApp');
const loadStudentApp = (): Promise<ModuleType> => import('./StudentApp');
const AdminApp = React.lazy(
  () => retryPromise(loadAdminApp) as Promise<ModuleType>
);
const StudentApp = React.lazy(
  () => retryPromise(loadStudentApp) as Promise<ModuleType>
);
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

const App: React.FunctionComponent = () => {
  // user will be undefined when not logged in or when jwt expires
  const { user, isStaff } = useUser();

  React.useEffect(() => {
    loadStudentApp();
    loadAdminApp();
  }, []);

  return (
    <MuiThemeProvider
      theme={user == null || isStaff ? adminTheme : studentTheme}
    >
      <LocalizationProvider dateAdapter={dateFnsUtils}>
        <React.Suspense fallback={<Loading />}>
          {/* Renders the appropriate app */}
          {/* eslint-disable-next-line no-nested-ternary */}
          {user ? (
            isStaff ? (
              <AdminApp />
            ) : (
              <StudentApp />
            )
          ) : (
            <UnauthenticatedApp />
          )}
        </React.Suspense>
      </LocalizationProvider>
    </MuiThemeProvider>
  );
};

export default App;
