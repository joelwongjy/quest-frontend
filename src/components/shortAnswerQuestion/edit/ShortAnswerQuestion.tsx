import React from 'react';

import { FormGroup, TextField } from '@material-ui/core';

import QuestionBuilder from 'components/questionBuilder/QuestionBuilder';

import { QuestComponentProps } from 'interfaces/components/common';

const ShortAnswerQuestion: React.FunctionComponent<QuestComponentProps> = () => {
  return (
    <FormGroup>
      <QuestionBuilder />
      <TextField disabled id="disabled" defaultValue="Short answer text" />
    </FormGroup>
  );
};

export default ShortAnswerQuestion;
