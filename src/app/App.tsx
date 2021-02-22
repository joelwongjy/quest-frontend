import React from 'react';

import { useUser } from 'contexts/UserContext';
import Loading from 'components/loading';
import { retryPromise } from 'utils/promiseUtils';
import { ClassUserRole } from 'interfaces/models/classUsers';

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
  const user = useUser();
  const isAdmin = user && user.highestClassRole === ClassUserRole.ADMIN;

  React.useEffect(() => {
    loadStudentApp();
    loadAdminApp();
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      {/* Renders the appropriate app */}
      {/* eslint-disable-next-line no-nested-ternary */}
      {user ? isAdmin ? <AdminApp /> : <StudentApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
