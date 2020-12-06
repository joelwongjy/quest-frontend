import React from 'react';

import { useUser } from 'contexts/UserContext';
import { useAuth } from 'contexts/AuthContext';
import PageContainer from 'components/pageContainer';
import QuestBreadcrumbs from 'componentWrappers/questBreadcrumbs';
import QuestButton from 'componentWrappers/questButton';
import { HOME } from 'constants/routes';
import ApiService from 'services/apiService';

import { useStyles } from './home.styles';

const Home: React.FunctionComponent = () => {
  const { name } = useUser()!;
  const { logout } = useAuth();
  const classes = useStyles();

  const breadcrumbs = [{ text: 'Home', href: HOME }];

  return (
    <PageContainer>
      <QuestBreadcrumbs breadcrumbs={breadcrumbs} />
      <div>You&apos;re logged in, {name}!</div>
      <br />
      <QuestButton onClick={logout} className={classes.button}>
        Log out
      </QuestButton>
      <QuestButton
        onClick={async () => {
          const response = await ApiService.get('seed');
          // eslint-disable-next-line no-console
          console.log(response.data.message);
        }}
        className={classes.button}
      >
        Seed
      </QuestButton>
    </PageContainer>
  );
};

export default Home;
