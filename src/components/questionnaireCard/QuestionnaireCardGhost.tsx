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

import { CardMode } from 'interfaces/components/questionnaireCard';

import { useStyles } from './questionnaireCard.styles';

interface QuestionnaireCardGhostProps {
  mode?: CardMode;
}

const QuestionnaireCardGhost: React.FC<QuestionnaireCardGhostProps> = ({
  mode = CardMode.STAFF,
}) => {
  const classes = useStyles();
  return (
    <>
      {mode !== CardMode.STUDENT && (
        <Typography
          className={classes.dates}
          color="textSecondary"
          gutterBottom
        >
          <Skeleton />
        </Typography>
      )}

      <Card>
        <CardHeader
          title={<Skeleton />}
          action={
            mode !== CardMode.STUDENT && (
              <>
                <IconButton
                  aria-label="more options"
                  aria-controls="more options"
                  aria-haspopup="true"
                >
                  <MoreVertIcon />
                </IconButton>
              </>
            )
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
            className={classes.statusDraft}
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
