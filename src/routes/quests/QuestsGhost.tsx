import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import { CardMode } from 'interfaces/components/questionnaireCard';
import StudentBoard from 'components/studentBoard';

import mascotImage from '../../assets/images/student/mascot.png';
import { useStyles } from './quests.styles';

const QuestsGhost: React.FC = () => {
  const classes = useStyles();
  return (
    <PageContainer hasContentPadding={false} isLoggedIn>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} item>
          <StudentBoard title="Quests" className={classes.quests}>
            <ul className={classes.scrollable}>
              <Grid container className={classes.main}>
                <Grid container justify="center" style={{ margin: '1rem' }}>
                  <Button
                    style={{
                      textTransform: 'none',
                      textDecoration: 'underline',
                      color: '#DA3501',
                    }}
                  >
                    <Typography variant="h6">New</Typography>
                  </Button>
                  <Button
                    style={{
                      textTransform: 'none',
                      color: undefined,
                    }}
                  >
                    <Typography variant="h6">Completed</Typography>
                  </Button>
                </Grid>
                <Grid container spacing={0} justify="flex-start">
                  <Grid
                    item
                    xs={12}
                    sm={9}
                    md={6}
                    style={{
                      margin: '0',
                      padding: '1rem',
                    }}
                  >
                    <QuestionnaireCardGhost
                      mode={CardMode.STUDENT}
                      className={classes.card}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={9}
                    md={6}
                    style={{
                      margin: '0',
                      padding: '1rem',
                    }}
                  >
                    <QuestionnaireCardGhost
                      mode={CardMode.STUDENT}
                      className={classes.card}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={9}
                    md={6}
                    style={{
                      margin: '0',
                      padding: '1rem',
                    }}
                  >
                    <QuestionnaireCardGhost
                      mode={CardMode.STUDENT}
                      className={classes.card}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </ul>
          </StudentBoard>
          <div className={classes.mascotContainer}>
            <div className={classes.mascotInnerContainer}>
              <div className={classes.mascotSpeech}>
                Knight, get ready to take on your quests!
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

export default QuestsGhost;
