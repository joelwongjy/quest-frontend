import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import PageContainer from 'components/pageContainer';
import StudentBoard from 'components/studentBoard';

import ProgressBar from './ProgressBar';

import { useStyles } from './attempt.styles';

const AttemptGhost: React.FC = () => {
  const classes = useStyles();

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} item>
          <StudentBoard
            title="Quests"
            className={classes.board}
            accessory={<ProgressBar current={0} total={1} />}
          >
            <div className={classes.body}>
              <div
                className={classes.question}
                style={{
                  marginTop: '1rem',
                  fontSize: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Skeleton width={300} />
              </div>
              <Grid container justify="space-between">
                <Button className={classes.button}>
                  <Typography variant="h6" style={{ color: 'gray' }}>
                    Previous
                  </Typography>
                </Button>
                <Button className={classes.button}>
                  <Typography variant="h6" style={{ color: 'gray' }}>
                    Next
                  </Typography>
                </Button>
              </Grid>
            </div>
          </StudentBoard>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default AttemptGhost;
