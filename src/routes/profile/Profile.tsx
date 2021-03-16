import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { differenceInCalendarYears } from 'date-fns';

import PageContainer from 'components/pageContainer';
import StudentBoard from 'components/studentBoard';
import QuestCard from 'componentWrappers/questCard';
import { useUser } from 'contexts/UserContext';
import { Gender } from 'interfaces/models/persons';

import maleKnight from 'assets/images/student/male-knight.png';
import femaleKnight from 'assets/images/student/female-knight.png';
import programmeBar from 'assets/images/student/programme-bar.png';
import sword from 'assets/images/student/sword-black.png';
import { useStyles } from './profile.styles';

const Profile: React.FC = () => {
  const { user } = useUser();
  const classes = useStyles();

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} container justify="center">
          <StudentBoard title="Profile" className={classes.profile}>
            <ul className={classes.scrollable}>
              <Grid container style={{ alignItems: 'center' }}>
                <Grid item xs={6}>
                  <QuestCard className={classes.card}>
                    <Grid container justify="center">
                      <img
                        src={
                          user!.gender === Gender.MALE
                            ? maleKnight
                            : femaleKnight
                        }
                        alt="Knight"
                        className={classes.avatar}
                      />
                    </Grid>
                  </QuestCard>
                </Grid>
                <Grid item xs={6}>
                  <List dense>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Name: ${user?.name}`}
                        style={{ fontSize: '1.5vw' }}
                      />
                    </ListItem>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Age: ${
                          user?.birthday
                            ? differenceInCalendarYears(
                                user?.birthday as Date,
                                new Date()
                              )
                            : 'Unknown'
                        }`}
                      />
                    </ListItem>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Birthday: ${user?.birthday ?? 'Unknown'}`}
                      />
                    </ListItem>
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={`Emergency Contact: ${
                          user?.mobileNumber ?? 'Unknown'
                        }`}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <div className={classes.programmeBarContainer}>
                  <img
                    src={programmeBar}
                    alt="bar"
                    className={classes.programmeBar}
                  />
                  <div className={classes.centered}>
                    <Typography>Programmes & Classes</Typography>
                  </div>
                </div>
              </Grid>
              <Grid
                container
                spacing={0}
                justify="center"
                style={{ padding: '1rem' }}
              >
                {user?.programmes.map((p) => {
                  return (
                    <Grid item xs={12} sm={11} md={10} lg={6} key={p.id}>
                      <QuestCard className={classes.programmeClassCard}>
                        <Grid
                          container
                          style={{
                            alignItems: 'center',
                            paddingLeft: '1rem',
                          }}
                        >
                          <Grid item xs={2}>
                            <img
                              src={sword}
                              alt="sword"
                              style={{ maxWidth: '75%' }}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <List key={p.id}>
                              {p.classes.map((c) => {
                                return (
                                  <ListItem
                                    key={c.id}
                                  >{`${p.name} - ${c.name}`}</ListItem>
                                );
                              })}
                            </List>
                          </Grid>
                        </Grid>
                      </QuestCard>
                    </Grid>
                  );
                })}
              </Grid>
            </ul>
          </StudentBoard>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Profile;
