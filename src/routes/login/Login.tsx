import React, { useState } from 'react';
import { Avatar, Link, Paper, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useAuth } from 'contexts/AuthContext';
import PageContainer from 'components/pageContainer';

import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { LOGIN } from 'constants/routes';

import { useStyles } from './login.styles';

const Login: React.FunctionComponent = () => {
  const classes = useStyles();
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const clearError = () => {
    setIsError(false);
    setErrorMessage('');
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await login({ username, password });
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <PageContainer hasDrawer={false} hasContentPadding={false}>
      <Grid container component="main" className={classes.root}>
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
              <QuestTextField
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="on"
                margin="normal"
                autoFocus
                value={username}
                onChange={(e) => {
                  clearError();
                  setUsername(e.target.value);
                }}
              />
              <QuestTextField
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                margin="normal"
                autoComplete="on"
                value={password}
                onChange={(e) => {
                  clearError();
                  setPassword(e.target.value);
                }}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
            /> */}
              <QuestButton type="submit" value="Submit" fullWidth>
                Sign In
              </QuestButton>
              <Grid container>
                <Grid item xs>
                  <Link href={LOGIN} variant="body2" color="secondary">
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
              {errorMessage}
            </div>
          </div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
