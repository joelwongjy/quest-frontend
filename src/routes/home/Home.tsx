import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';
import { format } from 'date-fns';

import AnnouncementTabs from 'components/announcementTabs';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import QuestCard from 'componentWrappers/questCard';
import { ANNOUNCEMENTS, CREATE, HOME } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { AnnouncementListData } from 'interfaces/models/announcements';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';

import { useStyles } from './home.styles';

interface HomeState extends RouteState {
  announcements: AnnouncementListData[];
}

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
      announcements: [],
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${ANNOUNCEMENTS}`);
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (!didCancel) {
          setState({ announcements: response.data.announcements });
        }
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
            {state.announcements.map((x) => {
              return (
                <QuestCard key={x.id} style={{ marginBottom: '2rem' }}>
                  <CardHeader
                    title={
                      <Grid container justify="space-between">
                        <Typography
                          className={classes.dates}
                          color="textSecondary"
                        >
                          {format(
                            new Date(x.startDate),
                            "d MMM y, hh:mm aaaaa'm'"
                          )}
                        </Typography>
                        <Typography
                          className={classes.dates}
                          color="textSecondary"
                          gutterBottom
                        >
                          {format(
                            new Date(x.endDate),
                            "d MMM y, hh:mm aaaaa'm'"
                          )}
                        </Typography>
                      </Grid>
                    }
                  />
                  <CardContent>
                    <Grid container justify="center">
                      <Typography
                        className="This is an announcement"
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: 'bold' }}
                      >
                        {x.title}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      justify="center"
                      style={{ padding: '1rem', textAlign: 'center' }}
                    >
                      <Typography className="This is an announcement">
                        {x.body}
                      </Typography>
                    </Grid>
                    <div className={classes.chipContainer}>
                      {user?.programmes.map((p) =>
                        p.classes
                          .filter(
                            (y) =>
                              x.classesData.map((z) => z.id).indexOf(y.id) !==
                              -1
                          )
                          .map((c) => (
                            <Chip
                              label={`${p.name} - ${c.name}`}
                              key={`${p.id}-${c.id}`}
                              style={{
                                margin: '5px',
                              }}
                              color="secondary"
                            />
                          ))
                      )}
                    </div>
                  </CardContent>
                </QuestCard>
              );
            })}
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
