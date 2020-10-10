import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  Typography,
  CssBaseline,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useAuth } from 'contexts/AuthContext';
import AppBar from 'components/appBar/AppBar';

import { useStyles } from './login.styles';

const Login: React.FunctionComponent = () => {
  const classes = useStyles();
  const { login } = useAuth();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isError, setIsError] = useState<boolean>(false);
  const [loginErrMsg, setLoginErrMsg] = useState('');

  const clearError = () => {
    setIsError(false);
    setLoginErrMsg('');
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await login(loginUsername, loginPassword);
    } catch (error) {
      setIsError(true);
      setLoginErrMsg(error.message);
    }
  };

  return (
    <div style={{ paddingTop: '2.9rem' }}>
      <CssBaseline />
      <AppBar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleLogin}>
              <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={loginUsername}
                onChange={(e) => {
                  clearError();
                  setLoginUsername(e.target.value);
                }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => {
                  clearError();
                  setLoginPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                value="Submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="routes/login" variant="body2" color="secondary">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
            {isError && (
              <div style={{ color: 'red', marginTop: '0.5rem' }}>
                {loginErrMsg}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
