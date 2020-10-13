import React, { useState } from 'react';
import { FormControl, FormLabel, IconButton } from '@material-ui/core';
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

export interface QuestMoodProps extends QuestComponentProps {
  question: string;
}

const MoodQuestion: React.FunctionComponent<QuestMoodProps> = ({
  question,
}) => {
  const [mood, setMood] = useState<number>();

  const selectMood = (index: number) => {
    setMood(index);
  };

  return (
    <FormControl>
      <FormLabel component="legend">{question}</FormLabel>
      <div>
        <IconButton aria-label="verysatisfied" onClick={() => selectMood(0)}>
          <SentimentVeryDissatisfied
            fontSize="large"
            color={mood === 0 ? 'secondary' : 'inherit'}
          />
        </IconButton>
        <IconButton aria-label="verysatisfied" onClick={() => selectMood(1)}>
          <SentimentDissatisfied
            fontSize="large"
            color={mood === 1 ? 'secondary' : 'inherit'}
          />
        </IconButton>
        <IconButton aria-label="verysatisfied" onClick={() => selectMood(2)}>
          <SentimentSatisfied
            fontSize="large"
            color={mood === 2 ? 'secondary' : 'inherit'}
          />
        </IconButton>
        <IconButton aria-label="verysatisfied" onClick={() => selectMood(3)}>
          <SentimentSatisfiedAlt
            fontSize="large"
            color={mood === 3 ? 'secondary' : 'inherit'}
          />
        </IconButton>
        <IconButton aria-label="verysatisfied" onClick={() => selectMood(4)}>
          <SentimentVerySatisfied
            fontSize="large"
            color={mood === 4 ? 'secondary' : 'inherit'}
          />
        </IconButton>
      </div>
    </FormControl>
  );
};

export default MoodQuestion;
