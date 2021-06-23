import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

import AnnouncementTabs from 'components/announcementTabs';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import QuestCard from 'componentWrappers/questCard';
import { ANNOUNCEMENTS, CREATE, HOME } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';

import { useStyles } from './home.styles';

type HomeState = RouteState;

export const tabs = ['Active', 'Upcoming', 'Past'];

const Home: React.FunctionComponent = () => {
  const { user } = useUser();
  const { name } = user!;

  const breadcrumbs = [{ text: 'Home', href: HOME }];

  const [tabValue, setTabValue] = useState<number>(0);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [state, setState] = useReducer(
    (s: HomeState, a: Partial<HomeState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
      hasConfirm: false,
      closeHandler: () => {
        setState({ isAlertOpen: false });
      },
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${ANNOUNCEMENTS}`);
        // eslint-disable-next-line no-console
        console.log(response.data);
      } catch (error) {
        if (!didCancel) {
          // eslint-disable-next-line no-console
          console.log(`Error ${error}`);
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={`${ANNOUNCEMENTS}${CREATE}`}
          >
            New Announcement
          </Button>
        }
      />
      <div>You&apos;re logged in, {name}!</div>
      <br />
      <Grid container className={classes.main}>
        <AnnouncementTabs
          value={tabValue}
          setValue={setTabValue}
          labels={tabs}
        />
        <Grid container alignContent="center" justify="center">
          <Grid item xs={12} sm={12} lg={12}>
            <QuestCard>
              <CardHeader
                title={
                  <Grid container justify="space-between">
                    <Typography className={classes.dates} color="textSecondary">
                      Start: 01 07 2021
                    </Typography>
                    <Typography
                      className={classes.dates}
                      color="textSecondary"
                      gutterBottom
                    >
                      End: 03 07 2021
                    </Typography>
                  </Grid>
                }
              />
              <CardContent>
                <Typography
                  className="This is an announcement"
                  variant="h6"
                  component="h2"
                >
                  Welcome to Quest, this is an announcement for you, please do
                  all your quests by 23:59 today
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  size="small"
                  className={classes.button}
                  component={Link}
                  to={`${ANNOUNCEMENTS}`}
                >
                  Programme
                </Button>
              </CardActions>
            </QuestCard>
          </Grid>
        </Grid>
      </Grid>
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Home;
