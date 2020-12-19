import React from 'react';
import { FormGroup, IconButton } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import QuestTextField from 'componentWrappers/questTextField';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewMoodQuestion.styles';

interface ViewMoodQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewMoodQuestion: React.FunctionComponent<ViewMoodQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    if (answer) {
      return (
        <div className={classes.top}>
          <div className={classes.textfieldContainer}>
            <QuestTextField
              className={classes.textfield}
              label="Question"
              value={answer.questionOrder.questionText}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={classes.emojiContainer}>
            <IconButton aria-label="Very Dissatisfied">
              <SentimentVeryDissatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Sissatisfied">
              <SentimentDissatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Neutral">
              <SentimentSatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Satisfied">
              <SentimentSatisfiedAlt fontSize="large" />
            </IconButton>
            <IconButton aria-label="Very Satisfied">
              <SentimentVerySatisfied fontSize="large" />
            </IconButton>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewMoodQuestion;
