import React, { useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { isAfter, isBefore } from 'date-fns';

import AnnouncementCard from 'components/announcementCard';
import AnnouncementTabs from 'components/announcementTabs';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import { ANNOUNCEMENTS, CREATE, EDIT, HOME } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { AnnouncementListData } from 'interfaces/models/announcements';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './home.styles';

interface HomeState extends RouteState {
  announcements: AnnouncementListData[];
}

export const tabs = ['Active', 'Upcoming', 'Past'];

const Home: React.FunctionComponent = () => {
  const { user } = useUser();
  const { name } = user!;
  const history = useHistory();

  const breadcrumbs = [{ text: 'Home', href: HOME }];

  const [tabValue, setTabValue] = useState<number>(0);

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

  const alertCallback = getAlertCallback(setState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${ANNOUNCEMENTS}`);
        if (!didCancel) {
          setState({ announcements: response.data.announcements });
        }
      } catch (error) {
        if (!didCancel) {
          alertCallback(
            true,
            false,
            'Something went wrong',
            'Please refresh and try again later.'
          );
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const filterAnnouncements = () => {
    const now = new Date();
    switch (tabValue) {
      case 1:
        return state.announcements.filter((x) => {
          return isAfter(new Date(x.startDate), now);
        });
      case 2:
        return state.announcements.filter((x) => {
          return isBefore(new Date(x.endDate), now);
        });
      case 0:
      default:
        return state.announcements.filter((x) => {
          return (
            isBefore(new Date(x.startDate), now) &&
            isAfter(new Date(x.endDate), now)
          );
        });
    }
  };

  const renderedAnnouncements = filterAnnouncements();

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
            {renderedAnnouncements.map((x) => {
              return (
                <AnnouncementCard
                  key={`announcement-card-${x.id}`}
                  announcement={x}
                  deleteCallback={() => {
                    alertCallback(
                      true,
                      true,
                      'Are you sure?',
                      'You will not be able to retrieve the deleted announcement',
                      async () => {
                        ApiService.delete(`${ANNOUNCEMENTS}/${x.id}`).then(
                          () => {
                            const newAnnouncements = state.announcements.filter(
                              (announcement) => announcement.id !== x.id
                            );
                            setState({
                              announcements: newAnnouncements,
                            });
                          }
                        );
                      }
                    );
                  }}
                  editCallback={() => {
                    history.push(`${ANNOUNCEMENTS}/${x.id}${EDIT}`);
                  }}
                />
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
