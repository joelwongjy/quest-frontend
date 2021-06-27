import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';

import AnnouncementTabs from 'components/announcementTabs';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import QuestCard from 'componentWrappers/questCard';
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

  const [anchorEle, setAnchorEle] = useState<null | HTMLElement>(null);

  const alertCallback = getAlertCallback(setState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEle(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEle(null);
  };

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
                      <>
                        <Typography
                          className={classes.dates}
                          color="textSecondary"
                        >
                          {`Start: ${format(
                            new Date(x.startDate),
                            'd MMM y, h:mm a'
                          )}`}
                        </Typography>
                        <Typography
                          className={classes.dates}
                          color="textSecondary"
                          gutterBottom
                        >
                          {`End: ${format(
                            new Date(x.endDate),
                            "d MMM y, h:mm a'"
                          )}`}
                        </Typography>
                      </>
                    }
                    action={
                      <>
                        <IconButton
                          aria-label="more options"
                          aria-controls="more options"
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`announcement-menu-${x.id}`}
                          anchorEl={anchorEle}
                          keepMounted
                          open={Boolean(anchorEle)}
                          onClose={handleClose}
                        >
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              history.push(`${ANNOUNCEMENTS}/${x.id}${EDIT}`);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              alertCallback(
                                true,
                                true,
                                'Are you sure?',
                                'You will not be able to retrieve the deleted announcement',
                                async () => {
                                  ApiService.delete(
                                    `${ANNOUNCEMENTS}/${x.id}`
                                  ).then(() => {
                                    const newAnnouncements =
                                      state.announcements.filter(
                                        (announcement) =>
                                          announcement.id !== x.id
                                      );
                                    setState({
                                      announcements: newAnnouncements,
                                    });
                                  });
                                }
                              );
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </>
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
