/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import QuestCard from 'componentWrappers/questCard';
import { QuestComponentProps } from 'interfaces/components/common';
import {
  QuestionMode,
  QuestionAccessibility,
} from 'interfaces/models/questionnaires';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from '../questionCard.styles';

interface ViewQuestionCardProps extends QuestComponentProps {
  question: QuestionnaireDuxQuestion;
  mode: QuestionMode;
  answer: AnswerData;
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
  mode,
  answer,
  accessibility,
  alertCallback,
  className,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    return <></>;
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
