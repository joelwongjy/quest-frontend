import React from 'react';

import { FormGroup, TextField } from '@material-ui/core';

import { QuestionOrder } from 'interfaces/models/questionnaires';

import { useStyles } from './editLongAnswerQuestion.styles';

interface EditLongAnswerQuestionProps {
  question: QuestionOrder;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const EditLongAnswerQuestion: React.FunctionComponent<EditLongAnswerQuestionProps> = ({
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
      <TextField
        disabled
        id="disabled"
        defaultValue="Long answer text"
        rows={3}
      />
    </FormGroup>
  );
};

export default EditLongAnswerQuestion;
