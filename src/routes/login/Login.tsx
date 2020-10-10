import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Link,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useAuth } from 'contexts/AuthContext';
import PageContainer from 'components/pageContainer';

import Input from 'components/input';
import { useStyles } from './login.styles';

const Login: React.FunctionComponent = () => {
  const classes = useStyles();
  const { login } = useAuth();

  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [isError, setIsError] = useState<boolean>(false);
  const [loginErrMsg, setLoginErrMsg] = useState<string>('');

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
    <PageContainer>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <Input
              required
              id="username"
              label="Username"
              name="username"
              autoComplete="on"
              autoFocus
              value={loginUsername}
              onChange={(e) => {
                clearError();
                setLoginUsername(e.target.value);
              }}
            />
            <Input
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="on"
              value={loginPassword}
              onChange={(e) => {
                clearError();
                setLoginPassword(e.target.value);
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
            /> */}
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
          <div
            style={{
              color: 'red',
              marginTop: '0.5rem',
              visibility: isError ? 'visible' : 'hidden',
              height: '2rem',
            }}
          >
            {loginErrMsg}
          </div>
        </div>
      </Grid>
    </PageContainer>
  );
};

export default Login;
