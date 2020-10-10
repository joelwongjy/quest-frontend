import React from 'react';

import { useUser } from 'contexts/UserContext';
import { useAuth } from 'contexts/AuthContext';

import './Home.scss';

const Home: React.FunctionComponent = () => {
  const { name } = useUser()!;
  const { logout } = useAuth();
  return (
    <div style={{ padding: '1rem' }}>
      <div>You&apos;re logged in, {name}!</div>
      <br />
      <button type="button" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Home;
