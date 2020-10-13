import React from 'react';

import { FormControl, FormLabel, TextField } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

export interface QuestLongAnswerProps extends QuestComponentProps {
  question: string;
}

const LongAnswerQuestion: React.FunctionComponent<QuestLongAnswerProps> = ({
  question,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}</FormLabel>
      <TextField placeholder="Long answer text" />
    </FormControl>
  );
};

export default LongAnswerQuestion;
