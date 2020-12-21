/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import QuestCard from 'componentWrappers/questCard';
import { QuestComponentProps } from 'interfaces/components/common';
import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { AnswerData } from 'interfaces/models/answers';
import { QuestionType } from 'interfaces/models/questions';
import ViewMcqQuestion from 'components/mcqQuestion/view';
import ViewScaleQuestion from 'components/scaleQuestion/view';
import ViewMoodQuestion from 'components/moodQuestion/view';
import ViewLongAnswerQuestion from 'components/longAnswerQuestion/view';
import ViewShortAnswerQuestion from 'components/shortAnswerQuestion/view';
import { useStyles } from './viewQuestionCard.styles';

interface ViewQuestionCardProps extends QuestComponentProps {
  question: QuestionnaireDuxQuestion;
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
  accessibility: QuestionAccessibility;
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
  accessibility,
  alertCallback,
  className,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    switch (question.questionType) {
      case QuestionType.SHORT_ANSWER:
        return <ViewShortAnswerQuestion answer={answer} />;
      case QuestionType.LONG_ANSWER:
        return (
          <ViewLongAnswerQuestion
            answer={answer}
            answerBefore={answerBefore}
            answerAfter={answerAfter}
          />
        );
      case QuestionType.MOOD:
        return <ViewMoodQuestion answer={answer} />;
      case QuestionType.SCALE:
        return <ViewScaleQuestion answer={answer} />;
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

  return (
    <QuestCard className={className} key={question.duxId}>
      <MuiThemeProvider theme={InputMuiTheme}>
        {renderQuestion()}
      </MuiThemeProvider>
    </QuestCard>
  );
};

export default ViewQuestionCard;
