import React from 'react';

import { useUser } from 'contexts/UserContext';
import { useAuth } from 'contexts/AuthContext';
import PageContainer from 'components/pageContainer';
import Breadcrumbs from 'components/breadcrumbs';
import { HOME } from 'constants/routes';

import './Home.scss';

const Home: React.FunctionComponent = () => {
  const { name } = useUser()!;
  const { logout } = useAuth();

  const breadcrumbs = [{ text: 'Home', href: HOME }];

  return (
    <PageContainer>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>You&apos;re logged in, {name}!</div>
      <br />
      <button type="button" onClick={logout}>
        Log out
      </button>
    </PageContainer>
  );
};

export default Home;
