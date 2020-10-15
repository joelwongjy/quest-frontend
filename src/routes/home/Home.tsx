import React from 'react';
import { Button } from '@material-ui/core';

import { useUser } from 'contexts/UserContext';
import { useAuth } from 'contexts/AuthContext';
import PageContainer from 'components/pageContainer';
import Breadcrumbs from 'components/breadcrumbs';
import { HOME } from 'constants/routes';
import ApiService from 'services/apiService';

const Home: React.FunctionComponent = () => {
  const { name } = useUser()!;
  const { logout } = useAuth();

  const breadcrumbs = [{ text: 'Home', href: HOME }];

  return (
    <PageContainer>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>You&apos;re logged in, {name}!</div>
      <br />
      <Button type="button" onClick={logout}>
        Log out
      </Button>
      <Button
        type="button"
        onClick={async () => {
          const response = await ApiService.get('seed');
          // eslint-disable-next-line no-console
          console.log(response.data.message);
        }}
      >
        Seed
      </Button>
    </PageContainer>
  );
};

export default Home;
