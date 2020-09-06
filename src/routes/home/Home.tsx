import React from 'react';

import { useUser } from 'contexts/UserContext';
import { useAuth } from 'contexts/AuthContext';

import './Home.scss';

const Home: React.FC = () => {
  const { name } = useUser()!;
  const { logout } = useAuth();
  return (
    <div>
      <div>You&apos;re logged in, {name}!</div>
      <button type="button" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Home;
