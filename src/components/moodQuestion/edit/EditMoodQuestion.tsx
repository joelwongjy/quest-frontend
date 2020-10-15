import React from 'react';
import { FormGroup, IconButton, TextField } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import { QuestionOrder } from 'interfaces/models/questionnaires';

import { useStyles } from './editMoodQuestion.styles';

interface EditMoodQuestionProps {
  question: QuestionOrder;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const EditMoodQuestion: React.FunctionComponent<EditMoodQuestionProps> = ({
  question,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  return (
    <FormGroup className={classes.card}>
      <div className={classes.top}>
        <TextField
          required
          className={classes.textfield}
          label="Question"
          variant="filled"
          value={question.questionText}
          onChange={(e) => updateText(e.target.value)}
        />
        {dropdown}
      </div>
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
