import React from 'react';
import { FormGroup, IconButton } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import QuestionBuilder from 'components/questionBuilder/QuestionBuilder';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './editMoodQuestion.styles';

// const moods = [
//   'SentimentVerySatisfied',
//   'SentimentSatisfiedAlt',
//   'SentimentSatisfied',
//   'SentimentDissatisfied',
//   'SentimentVeryDissatisfied',
// ];

const EditMoodQuestion: React.FunctionComponent<QuestComponentProps> = () => {
  const classes = useStyles();
  return (
    <FormGroup className={classes.card}>
      <QuestionBuilder />
      <div>
        <IconButton aria-label="verydissatisfied">
          <SentimentVeryDissatisfied fontSize="large" />
        </IconButton>
        <IconButton aria-label="dissatisfied">
          <SentimentDissatisfied fontSize="large" />
        </IconButton>
        <IconButton aria-label="satisfied">
          <SentimentSatisfied fontSize="large" />
        </IconButton>
        <IconButton aria-label="satisfiedalt">
          <SentimentSatisfiedAlt fontSize="large" />
        </IconButton>
        <IconButton aria-label="verysatisfied">
          <SentimentVerySatisfied fontSize="large" />
        </IconButton>
      </div>
    </FormGroup>
  );
};

export default EditMoodQuestion;
