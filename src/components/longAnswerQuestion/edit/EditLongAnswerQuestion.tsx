import React from 'react';
import { FormControl, FormGroup, FormHelperText } from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { useStyles } from './editLongAnswerQuestion.styles';

interface EditLongAnswerQuestionProps {
  question: QuestionnaireDuxQuestion;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
  dropdown: React.ReactNode;
}

const EditLongAnswerQuestion: React.FunctionComponent<EditLongAnswerQuestionProps> = ({
  question,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const hasQuestionTextError = hasError && question.questionText === '';

  return (
    <FormGroup className={classes.card}>
      <div className={classes.top}>
        <div className={classes.textfieldContainer}>
          <FormControl style={{ width: '100%' }} error={hasQuestionTextError}>
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
          defaultValue="Long Answer"
          rows={3}
        />
      </div>
    </FormGroup>
  );
};

export default EditLongAnswerQuestion;
