import React, { useState } from 'react';

import { useAuth } from 'contexts/AuthContext';

import './Login.scss';

const Login: React.FC = () => {
  const { login, signup } = useAuth();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');

  const [isError, setIsError] = useState<boolean>(false);
  const [loginErrMsg, setLoginErrMsg] = useState('');
  const [signUpErrMsg, setSignUpErrMsg] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(loginUsername, loginPassword);
    } catch (error) {
      setIsError(true);
      setLoginErrMsg(error.message);
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup(signUpUsername, signUpPassword, signUpName);
    } catch (error) {
      setIsError(true);
      setSignUpErrMsg(error.message);
    }
  };

  const clearError = () => {
    setIsError(false);
    setLoginErrMsg('');
    setSignUpErrMsg('');
  };

  return (
    <div style={{ paddingLeft: '1.5rem' }}>
      <h2>Login:</h2>
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">
            Username:&nbsp;
            <input
              name="username"
              type="text"
              value={loginUsername}
              onChange={(e) => {
                clearError();
                setLoginUsername(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <p>
          <label htmlFor="password">
            Password:&nbsp;
            <input
              name="password"
              type="password"
              value={loginPassword}
              onChange={(e) => {
                clearError();
                setLoginPassword(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
      {isError && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>{loginErrMsg}</div>
      )}

      <h2>Sign Up:</h2>
      <form onSubmit={handleSignUp}>
        <p>
          <label htmlFor="username">
            Username:&nbsp;
            <input
              name="username"
              type="text"
              value={signUpUsername}
              onChange={(e) => {
                clearError();
                setSignUpUsername(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <p>
          <label htmlFor="password">
            Password:&nbsp;
            <input
              name="password"
              type="password"
              value={signUpPassword}
              onChange={(e) => {
                clearError();
                setSignUpPassword(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <p>
          <label htmlFor="name">
            Name:&nbsp;
            <input
              name="name"
              type="text"
              value={signUpName}
              onChange={(e) => {
                clearError();
                setSignUpName(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
      {isError && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>{signUpErrMsg}</div>
      )}
    </div>
  );
};

export default Login;
