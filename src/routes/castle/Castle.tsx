import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import mascotImage from 'assets/images/student/mascot.png';
import PageContainer from 'components/pageContainer';
// import ApiService from 'services/apiService';
import StudentBoard from 'components/studentBoard';
import { ANNOUNCEMENTS } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { AnnouncementListData } from 'interfaces/models/announcements';
import ApiService from 'services/apiService';

import AnnouncementListItem from './AnnouncementListItem';

import { useStyles } from './castle.styles';

const Castle: React.FunctionComponent = () => {
  const { user } = useUser()!;
  const classes = useStyles();

  const [announcements, setAnnouncements] = useState<AnnouncementListData[]>(
    []
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${ANNOUNCEMENTS}`);
        if (!didCancel) {
          setAnnouncements(response.data.announcements);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Error fetching announcements: ${error}`);
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid item xs={12} md={9} lg={6}>
          <StudentBoard title="Announcements" className={classes.announcements}>
            <ul className={classes.announcementList}>
              {announcements.map((x) => {
                return (
                  <AnnouncementListItem
                    programmeName="Programme X"
                    studentClassName="Class X1"
                    date={new Date()}
                    title={x.title}
                    body={x.body ?? ''}
                    key={x.id}
                  />
                );
              })}
            </ul>
          </StudentBoard>
          <div className={classes.mascotContainer}>
            <div className={classes.mascotInnerContainer}>
              <div className={classes.mascotSpeech}>
                Welcome {user?.name}! Have you checked out the latest happenings
                in town?
              </div>
              <img
                src={mascotImage}
                alt="Mascot"
                className={classes.mascotImage}
              />
            </div>
          </div>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Castle;
