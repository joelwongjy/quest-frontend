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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(loginUsername, loginPassword);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup(signUpUsername, signUpPassword, signUpName);
  };

  return (
    <div>
      <h2>Login:</h2>
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">
            Username:&nbsp;
            <input
              name="username"
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
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
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>

      <h2>Sign Up:</h2>
      <form onSubmit={handleSignUp}>
        <p>
          <label htmlFor="username">
            Username:&nbsp;
            <input
              name="username"
              type="text"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
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
              onChange={(e) => setSignUpPassword(e.target.value)}
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
              onChange={(e) => setSignUpName(e.target.value)}
            />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
