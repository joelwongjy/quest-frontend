import React from 'react';
import { CardActions, CardContent, Typography } from '@material-ui/core';

import QuestCard from 'componentWrappers/questCard';
import QuestButton from 'componentWrappers/questButton';
import { QuestComponentProps } from 'interfaces/components/common';
import { ProgrammeListData } from 'interfaces/models/programmes';

import { useStyles } from './programmeCard.styles';

interface ProgrammeCardProps extends QuestComponentProps {
  programme: ProgrammeListData;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ programme }) => {
  const classes = useStyles();

  return (
    <QuestCard>
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
        <QuestButton size="small" className={classes.button} variant="text">
          View Details
        </QuestButton>
      </CardActions>
    </QuestCard>
  );
};

export default ProgrammeCard;
