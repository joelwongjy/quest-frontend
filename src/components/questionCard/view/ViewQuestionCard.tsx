/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  createMuiTheme,
  FormControl,
  Grid,
  MuiThemeProvider,
} from '@material-ui/core';

import ViewLongAnswerQuestion from 'components/longAnswerQuestion/view';
import ViewMcqQuestion from 'components/mcqQuestion/view';
import ViewMoodQuestion from 'components/moodQuestion/view';
import ViewScaleQuestion from 'components/scaleQuestion/view';
import ViewShortAnswerQuestion from 'components/shortAnswerQuestion/view';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import { QuestComponentProps } from 'interfaces/components/common';
import { AnswerData } from 'interfaces/models/answers';
import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import { QuestionData, QuestionType } from 'interfaces/models/questions';

import { useStyles } from './viewQuestionCard.styles';

interface ViewQuestionCardProps extends QuestComponentProps {
  question: QuestionData;
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
  accessibility: QuestionAccessibility;
  headerStyles?: string;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const InputMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#044682',
    },
  },
});

const ViewQuestionCard: React.FC<ViewQuestionCardProps> = ({
  question,
  answer,
  answerBefore,
  answerAfter,
  headerStyles,
}) => {
  const classes = useStyles();

  const renderAnswer = () => {
    switch (question.questionType) {
      case QuestionType.SHORT_ANSWER:
        return (
          <ViewShortAnswerQuestion
            answer={answer}
            answerBefore={answerBefore}
            answerAfter={answerAfter}
          />
        );
      case QuestionType.LONG_ANSWER:
        return (
          <ViewLongAnswerQuestion
            answer={answer}
            answerBefore={answerBefore}
            answerAfter={answerAfter}
          />
        );
      case QuestionType.MOOD:
        return (
          <ViewMoodQuestion
            answer={answer}
            answerBefore={answerBefore}
            answerAfter={answerAfter}
          />
        );
      case QuestionType.SCALE:
        return (
          <ViewScaleQuestion
            answer={answer}
            answerBefore={answerBefore}
            answerAfter={answerAfter}
          />
        );
      case QuestionType.MULTIPLE_CHOICE:
      default:
        return (
          <ViewMcqQuestion
            answer={answer}
            answerBefore={answerBefore}
            answerAfter={answerAfter}
          />
        );
    }
  };

  const renderQuestionText = () => {
    if (answer !== undefined) {
      return answer.questionOrder.questionText;
    }
    return answerBefore !== undefined
      ? answerBefore.questionOrder.questionText
      : answerAfter!.questionOrder.questionText;
  };

  return (
    <QuestCard className={classes.card} key={question.qnOrderId}>
      <Grid>
        <Grid item xs={12} className={headerStyles}>
          <div className={classes.textfieldContainer}>
            <FormControl style={{ width: '100%', backgroundColor: '#F8F8F8' }}>
              <QuestTextField
                className={classes.textfield}
                value={renderQuestionText()}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <MuiThemeProvider theme={InputMuiTheme}>
            {renderAnswer()}
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </QuestCard>
  );
};

export default ViewQuestionCard;
