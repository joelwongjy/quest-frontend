import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useStyles } from './questionnaireCard.styles';

const QuestionnaireCardGhost: React.FunctionComponent = () => {
  const classes = useStyles();
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
            className={classes.status}
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
