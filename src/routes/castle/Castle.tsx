import React from 'react';
import { Grid } from '@material-ui/core';

import { useUser } from 'contexts/UserContext';
import PageContainer from 'components/pageContainer';
// import ApiService from 'services/apiService';
import StudentBoard from 'components/studentBoard';
import mascotImage from 'assets/images/student/mascot.png';

import AnnouncementListItem from './AnnouncementListItem';
import { useStyles } from './castle.styles';

const Castle: React.FunctionComponent = () => {
  const { user } = useUser();
  const { name } = user!;
  const classes = useStyles();

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} md={9} lg={6}>
          <StudentBoard title="Announcements" className={classes.announcements}>
            <ul className={classes.announcementList}>
              <AnnouncementListItem
                programmeName="Programme A"
                studentClassName="Class A1"
                date={new Date()}
                title="Welcome!"
                body="Welcome to CampusImpact's website!"
              />
            </ul>
          </StudentBoard>
          <div className={classes.mascotContainer}>
            <div className={classes.mascotInnerContainer}>
              <div className={classes.mascotSpeech}>
                Welcome {name}! Have you checked out the latest happenings in
                town?
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
