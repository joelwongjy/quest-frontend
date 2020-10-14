import React from 'react';

import { FormControl, FormLabel, TextField } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

export interface QuestShortAnswerProps extends QuestComponentProps {
  question: string;
}

const ViewShortAnswerQuestion: React.FunctionComponent<QuestShortAnswerProps> = ({
  question,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}</FormLabel>
      <TextField placeholder="Short answer text" />
    </FormControl>
  );
};

export default ViewShortAnswerQuestion;
