import React from 'react';

import { FormGroup, FormLabel, TextField } from '@material-ui/core';

import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';

import { useStyles } from './LongAnswerQuestion.styles';

interface LongAnswerQuestionProps {
  question: QuestionOrder;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const LongAnswerQuestion: React.FunctionComponent<LongAnswerQuestionProps> = ({
  question,
  mode,
  updateQuestion,
  dropdown,
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
            <TextField
              disabled
              id="disabled"
              defaultValue="Long answer text"
              rows={3}
            />
            {dropdown}
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
            <TextField placeholder="Long answer text" />
          </div>
        );
    }
    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default LongAnswerQuestion;
