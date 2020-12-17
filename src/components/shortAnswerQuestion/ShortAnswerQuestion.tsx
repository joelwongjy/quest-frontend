import React from 'react';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';
import { QuestionMode } from 'interfaces/models/questionnaires';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { useStyles } from './ShortAnswerQuestion.styles';

interface ShortAnswerQuestionProps {
  dropdown: React.ReactNode;
  question: QuestionnaireDuxQuestion;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
}

const ShortAnswerQuestion: React.FunctionComponent<ShortAnswerQuestionProps> = ({
  dropdown,
  question,
  mode,
  updateQuestion,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const hasQuestionTextError = hasError && question.questionText === '';

  const renderQuestion = () => {
    switch (mode) {
      case QuestionMode.EDIT || QuestionMode.NEW:
        return (
          <div className={classes.top}>
            <div className={classes.textfieldContainer}>
              <FormControl
                style={{ width: '100%' }}
                error={hasQuestionTextError}
              >
                <QuestTextField
                  required
                  className={classes.textfield}
                  label="Question"
                  variant="filled"
                  value={question.questionText}
                  onChange={(e) => updateText(e.target.value)}
                />
                {hasQuestionTextError && (
                  <FormHelperText>The question cannot be blank!</FormHelperText>
                )}
              </FormControl>
              {dropdown}
            </div>
            <QuestTextField
              disabled
              id="disabled"
              defaultValue="Short Answer"
            />
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
            <QuestTextField placeholder="Short Answer" />
          </div>
        );
    }
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ShortAnswerQuestion;
