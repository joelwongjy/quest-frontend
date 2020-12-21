import React, { useState } from 'react';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
} from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { useStyles } from './EditMoodQuestion.styles';

interface EditMoodQuestionProps {
  question: QuestionnaireDuxQuestion;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
  dropdown: React.ReactNode;
}

const EditMoodQuestion: React.FunctionComponent<EditMoodQuestionProps> = ({
  question,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const [mood, setMood] = useState<number>();

  const selectMood = (index: number) => {
    setMood(index);
  };

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
        <div className={classes.emojiContainer}>
          <IconButton
            aria-label="Very Dissatisfied"
            onClick={() => selectMood(0)}
          >
            <SentimentVeryDissatisfied
              fontSize="large"
              color={mood === 0 ? 'secondary' : 'inherit'}
            />
          </IconButton>
          <IconButton aria-label="Dissatisfied" onClick={() => selectMood(1)}>
            <SentimentDissatisfied
              fontSize="large"
              color={mood === 1 ? 'secondary' : 'inherit'}
            />
          </IconButton>
          <IconButton aria-label="Neutral" onClick={() => selectMood(2)}>
            <SentimentSatisfied
              fontSize="large"
              color={mood === 2 ? 'secondary' : 'inherit'}
            />
          </IconButton>
          <IconButton aria-label="Satisfied" onClick={() => selectMood(3)}>
            <SentimentSatisfiedAlt
              fontSize="large"
              color={mood === 3 ? 'secondary' : 'inherit'}
            />
          </IconButton>
          <IconButton aria-label="Very Satisfied" onClick={() => selectMood(4)}>
            <SentimentVerySatisfied
              fontSize="large"
              color={mood === 4 ? 'secondary' : 'inherit'}
            />
          </IconButton>
        </div>
      </div>
    </FormGroup>
  );
};

export default EditMoodQuestion;
