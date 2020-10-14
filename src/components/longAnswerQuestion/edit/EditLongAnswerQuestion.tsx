import React from 'react';

import { FormGroup, TextField } from '@material-ui/core';

import QuestionBuilder from 'components/questionBuilder/QuestionBuilder';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './editLongAnswerQuestion.styles';

const EditLongAnswerQuestion: React.FunctionComponent<QuestComponentProps> = () => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.card}>
      <QuestionBuilder />
      <TextField disabled id="disabled" defaultValue="Long answer text" />
    </FormGroup>
  );
};

export default EditLongAnswerQuestion;
