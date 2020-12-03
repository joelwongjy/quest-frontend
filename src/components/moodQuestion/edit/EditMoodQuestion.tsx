import React from 'react';
import { FormGroup, IconButton } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import { QuestComponentProps } from 'interfaces/components/common';

// const moods = [
//   'SentimentVerySatisfied',
//   'SentimentSatisfiedAlt',
//   'SentimentSatisfied',
//   'SentimentDissatisfied',
//   'SentimentVeryDissatisfied',
// ];

const EditMoodQuestion: React.FunctionComponent<QuestComponentProps> = () => {
  return (
    <FormGroup>
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
