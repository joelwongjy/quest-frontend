import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import { useStyles } from './EditMoodQuestion.styles';

const EditMoodQuestion: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.emojiContainer}>
      <IconButton aria-label="Very Dissatisfied">
        <SentimentVeryDissatisfied fontSize="large" color="inherit" />
      </IconButton>
      <IconButton aria-label="Dissatisfied">
        <SentimentDissatisfied fontSize="large" color="inherit" />
      </IconButton>
      <IconButton aria-label="Neutral">
        <SentimentSatisfied fontSize="large" color="inherit" />
      </IconButton>
      <IconButton aria-label="Satisfied">
        <SentimentSatisfiedAlt fontSize="large" color="inherit" />
      </IconButton>
      <IconButton aria-label="Very Satisfied">
        <SentimentVerySatisfied fontSize="large" color="inherit" />
      </IconButton>
    </div>
  );
};

export default EditMoodQuestion;
