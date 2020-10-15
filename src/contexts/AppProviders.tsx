import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';

import { theme } from 'styles/theme';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';

const AppProviders: React.FunctionComponent = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </LocalizationProvider>
    </MuiThemeProvider>
  );
};

export default AppProviders;
