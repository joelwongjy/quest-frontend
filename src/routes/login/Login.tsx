import React, { useState } from 'react';

import { useAuth } from 'contexts/AuthContext';

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
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'components/loading/AppBar';
import { theme } from 'styles/theme';

import './Login.scss';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const { login } = useAuth();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // const [signUpUsername, setSignUpUsername] = useState('');
  // const [signUpPassword, setSignUpPassword] = useState('');
  // const [signUpName, setSignUpName] = useState('');

  const [isError, setIsError] = useState<boolean>(false);
  const [loginErrMsg, setLoginErrMsg] = useState('');
  // const [signUpErrMsg, setSignUpErrMsg] = useState('');

  const clearError = () => {
    setIsError(false);
    setLoginErrMsg('');
    // setSignUpErrMsg('');
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

  // const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   clearError();
  //   try {
  //     await signup(signUpUsername, signUpPassword, signUpName);
  //   } catch (error) {
  //     setIsError(true);
  //     setSignUpErrMsg(error.message);
  //   }
  // };

  return (
    <div style={{ paddingTop: '2.9rem' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
      </ThemeProvider>

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
