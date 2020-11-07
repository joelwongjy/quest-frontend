import React from 'react';
import { FormGroup, FormLabel, TextField } from '@material-ui/core';

import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';

import { useStyles } from './ShortAnswerQuestion.styles';

interface ShortAnswerQuestionProps {
  dropdown: React.ReactNode;
  question: QuestionOrder;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionOrder) => void;
}

const ShortAnswerQuestion: React.FunctionComponent<ShortAnswerQuestionProps> = ({
  dropdown,
  question,
  mode,
  updateQuestion,
}) => {
  const classes = useStyles();

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const renderQuestion = () => {
    switch (mode) {
      case QuestionMode.EDIT || QuestionMode.NEW:
        return (
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
            <TextField
              disabled
              id="disabled"
              defaultValue="Short answer text"
            />
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
            <TextField placeholder="Short answer text" />
          </div>
        );
    }
    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ShortAnswerQuestion;
