import React from 'react';
import { FormGroup, FormLabel } from '@material-ui/core';

import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';
import QuestTextField from 'componentWrappers/questTextField';

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
            <div className={classes.textfieldContainer}>
              <QuestTextField
                required
                className={classes.textfield}
                label="Question"
                variant="filled"
                value={question.questionText}
                onChange={(e) => updateText(e.target.value)}
              />
              {dropdown}
            </div>
            <QuestTextField
              disabled
              id="disabled"
              defaultValue="Long Answer"
              rows={3}
            />
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
            <QuestTextField placeholder="Long Answer" />
          </div>
        );
    }
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default LongAnswerQuestion;
