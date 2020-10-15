import React from 'react';
import { FormGroup, TextField } from '@material-ui/core';

import { QuestionOrder } from 'interfaces/models/questionnaires';

import { useStyles } from './editShortAnswerQuestion.styles';

interface EditShortAnswerQuestionProps {
  dropdown: React.ReactNode;
  question: QuestionOrder;
  updateQuestion: (newQuestion: QuestionOrder) => void;
}

const EditShortAnswerQuestion: React.FunctionComponent<EditShortAnswerQuestionProps> = ({
  dropdown,
  question,
  updateQuestion,
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
      <TextField disabled id="disabled" defaultValue="Short answer text" />
    </FormGroup>
  );
};

export default EditShortAnswerQuestion;
