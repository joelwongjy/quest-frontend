/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createMuiTheme, Grid, MuiThemeProvider } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';
import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData, QuestionType } from 'interfaces/models/questions';
import AttemptShortAnswerQuestion from 'components/shortAnswerQuestion/attempt';
import AttemptLongAnswerQuestion from 'components/longAnswerQuestion/attempt';
import AttemptMoodQuestion from 'components/moodQuestion/attempt';
import AttemptScaleQuestion from 'components/scaleQuestion/attempt';
import AttemptMcqQuestion from 'components/mcqQuestion/attempt';

import { useStyles } from './attemptQuestionCard.styles';

interface AttemptQuestionCardProps extends QuestComponentProps {
  question: QuestionData;
  answerCallback: (answer: AnswerPostData) => void;
  answer?: AnswerPostData;
  isAttempted?: boolean;
}

const InputMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#044682',
    },
  },
});

const AttemptQuestionCard: React.FC<AttemptQuestionCardProps> = ({
  question,
  answer,
  answerCallback,
  isAttempted = false,
  className,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    switch (question.questionType) {
      case QuestionType.SHORT_ANSWER:
        return (
          <AttemptShortAnswerQuestion
            question={question}
            answer={answer}
            answerCallback={answerCallback}
            isAttempted={isAttempted}
          />
        );
      case QuestionType.LONG_ANSWER:
        return (
          <AttemptLongAnswerQuestion
            question={question}
            answer={answer}
            answerCallback={answerCallback}
            isAttempted={isAttempted}
          />
        );
      case QuestionType.MOOD:
        return (
          <AttemptMoodQuestion
            question={question}
            answer={answer}
            answerCallback={answerCallback}
            isAttempted={isAttempted}
          />
        );
      case QuestionType.SCALE:
        return (
          <AttemptScaleQuestion
            question={question}
            answer={answer}
            answerCallback={answerCallback}
            isAttempted={isAttempted}
          />
        );
      case QuestionType.MULTIPLE_CHOICE:
      default:
        return (
          <AttemptMcqQuestion
            question={question}
            answer={answer}
            answerCallback={answerCallback}
            isAttempted={isAttempted}
          />
        );
    }
  };

  return (
    <Grid
      className={`${classes.container}${className ? ` ${className}` : ''}`}
      key={`attempt-${question.qnOrderId}`}
      container
      justify="center"
    >
      <Grid item xs={12}>
        <MuiThemeProvider theme={InputMuiTheme}>
          {renderQuestion()}
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
};

export default AttemptQuestionCard;
