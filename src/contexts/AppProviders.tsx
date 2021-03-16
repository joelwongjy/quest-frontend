import React from 'react';

import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { ErrorProvider } from './ErrorContext';

const AppProviders: React.FunctionComponent = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ErrorProvider>{children}</ErrorProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
