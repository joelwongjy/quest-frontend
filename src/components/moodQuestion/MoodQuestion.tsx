import React, { useState } from 'react';
import { FormGroup, FormLabel, IconButton, TextField } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';

import { useStyles } from './MoodQuestion.styles';

interface MoodQuestionProps {
  question: QuestionOrder;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const MoodQuestion: React.FunctionComponent<MoodQuestionProps> = ({
  question,
  mode,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();

  const [mood, setMood] = useState<number>();

  const selectMood = (index: number) => {
    setMood(index);
  };

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const renderQuestion = () => {
    switch (mode) {
      case QuestionMode.EDIT || QuestionMode.NEW:
        return (
          <div className={classes.top}>
            <div>
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
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
            <div>
              <IconButton
                aria-label="verysatisfied"
                onClick={() => selectMood(0)}
              >
                <SentimentVeryDissatisfied
                  fontSize="large"
                  color={mood === 0 ? 'secondary' : 'inherit'}
                />
              </IconButton>
              <IconButton
                aria-label="verysatisfied"
                onClick={() => selectMood(1)}
              >
                <SentimentDissatisfied
                  fontSize="large"
                  color={mood === 1 ? 'secondary' : 'inherit'}
                />
              </IconButton>
              <IconButton
                aria-label="verysatisfied"
                onClick={() => selectMood(2)}
              >
                <SentimentSatisfied
                  fontSize="large"
                  color={mood === 2 ? 'secondary' : 'inherit'}
                />
              </IconButton>
              <IconButton
                aria-label="verysatisfied"
                onClick={() => selectMood(3)}
              >
                <SentimentSatisfiedAlt
                  fontSize="large"
                  color={mood === 3 ? 'secondary' : 'inherit'}
                />
              </IconButton>
              <IconButton
                aria-label="verysatisfied"
                onClick={() => selectMood(4)}
              >
                <SentimentVerySatisfied
                  fontSize="large"
                  color={mood === 4 ? 'secondary' : 'inherit'}
                />
              </IconButton>
            </div>
          </div>
        );
    }
    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default MoodQuestion;
