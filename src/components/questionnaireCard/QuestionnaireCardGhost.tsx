import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

import QuestCard from 'componentWrappers/questCard';
import { QuestComponentProps } from 'interfaces/components/common';
import { CardMode } from 'interfaces/components/questionnaireCard';
import { getQuestStyle } from 'utils/questUtils';

import { useStyles } from './questionnaireCard.styles';

interface QuestionnaireCardGhostProps extends QuestComponentProps {
  mode?: CardMode;
}

const QuestionnaireCardGhost: React.FC<QuestionnaireCardGhostProps> = ({
  mode = CardMode.STAFF,
  className = '',
}) => {
  const classes = useStyles();

  if (mode === CardMode.STUDENT) {
    const questCardStyle = getQuestStyle();
    return (
      <QuestCard className={className}>
        <CardHeader
          title={
            <Grid container justify="center">
              <Typography variant="h5" className={classes.studentTitle}>
                <Skeleton width={120} />
              </Typography>
            </Grid>
          }
          style={{
            backgroundColor: questCardStyle[1],
            padding: '0.5rem',
          }}
        />
        <CardContent style={{ padding: 0, paddingTop: '0.5rem' }}>
          <Grid container justify="center">
            <Skeleton width={100} />
          </Grid>
          <Grid container justify="center" style={{ marginBottom: '0.5rem' }}>
            <img src={questCardStyle[0]} alt="icon" />
          </Grid>
          <Grid container justify="center">
            <Typography
              className={classes.dates}
              color="textSecondary"
              gutterBottom
            >
              <Skeleton width={150} />
            </Typography>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size="small">
            <Skeleton width={50} />
          </Button>
        </CardActions>
      </QuestCard>
    );
  }

  return (
    <>
      <Typography className={classes.dates} color="textSecondary" gutterBottom>
        <Skeleton />
      </Typography>

      <Card>
        <CardHeader
          title={<Skeleton />}
          action={
            <>
              <IconButton
                aria-label="more options"
                aria-controls="more options"
                aria-haspopup="true"
              >
                <MoreVertIcon />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            noWrap
          >
            <Skeleton />
          </Typography>
          <Typography
            className={classes.progammeName}
            color="textSecondary"
            variant="body2"
            component="p"
          >
            <Skeleton />
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Skeleton width="50%" height={30} />
        </CardActions>
      </Card>
    </>
  );
};

export default QuestionnaireCardGhost;
