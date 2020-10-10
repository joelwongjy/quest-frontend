import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from 'styles/theme';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';

const AppProviders: React.FunctionComponent = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default AppProviders;
