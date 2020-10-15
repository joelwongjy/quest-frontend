import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { QuestComponentProps } from 'interfaces/components/common';
import { ProgrammeListData } from 'interfaces/models/programmes';

import { useStyles } from './programmeCard.styles';

interface ProgrammeCardProps extends QuestComponentProps {
  programme: ProgrammeListData;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ programme }) => {
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            noWrap
          >
            {programme.name}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size="small" className={classes.button}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProgrammeCard;
