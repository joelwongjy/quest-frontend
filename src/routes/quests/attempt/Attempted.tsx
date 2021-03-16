import React, { useEffect, useReducer, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';

import { QUESTS } from 'constants/routes';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';

import AttemptQuestionCard from 'components/questionCard/attempt';
import { sortByOrder } from 'utils/sortingUtils';
import StudentBoard from 'components/studentBoard';
import { AttemptData } from 'interfaces/models/attempts';
import { AnswerData, AnswerPostData } from 'interfaces/models/answers';
import { QuestionData } from 'interfaces/models/questions';

import ProgressBar from './ProgressBar';
import AttemptGhost from './AttemptGhost';
import { useStyles } from './attempt.styles';

interface AttemptedState extends RouteState {
  attempt: AttemptData | null;
}

const Attempted: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const classes = useStyles();
  const history = useHistory();
  const [index, setIndex] = useState(0);

  const [state, setState] = useReducer(
    (s: AttemptedState, a: Partial<AttemptedState>) => ({
      ...s,
      ...a,
    }),
    {
      attempt: null,
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
      hasConfirm: false,
      closeHandler: () => {
        setState({ isAlertOpen: false });
      },
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(
          `questionnaires/submissions/${id}`
        );

        if (!didCancel) {
          setState({
            attempt: response.data,
            isLoading: false,
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isLoading: false, isError: true });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  if (state.isLoading) {
    return <AttemptGhost />;
  }

  if (state.isError) {
    return <></>; // TODO: Add error handling
  }

  const mapAnswerDataToPostData = (a: AnswerData): AnswerPostData => ({
    questionOrderId: a.questionOrder.qnOrderId,
    optionId: a.option?.optionId,
    textResponse: a.textResponse === null ? undefined : a.textResponse,
  });

  const questions: QuestionData[] =
    state.attempt?.questionnaireWindow.questions ?? [];
  const answers: AnswerPostData[] =
    state.attempt?.answers.map(mapAnswerDataToPostData) ?? [];

  questions.sort(sortByOrder);
  const question = questions[index];

  if (!state.isLoading && (questions.length === 0 || !question)) {
    return <Redirect to={QUESTS} />;
  }

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      history.push(QUESTS);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    } else {
      history.push(QUESTS);
    }
  };

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} item justify="center">
          <StudentBoard
            title="Quests"
            className={classes.board}
            accessory={
              <ProgressBar current={index + 1} total={questions.length} />
            }
          >
            <div className={classes.body}>
              <div className={classes.question}>
                <AttemptQuestionCard
                  question={questions[index]}
                  answer={
                    answers.find(
                      (a) => a.questionOrderId === question.qnOrderId
                    ) ?? undefined
                  }
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  answerCallback={(_) => undefined}
                  isAttempted
                />
              </div>
              <Grid container justify="space-between">
                <Button onClick={handlePrevious} className={classes.button}>
                  <Typography variant="h6">
                    {index > 0 ? 'Previous' : 'Back to Quests'}
                  </Typography>
                </Button>
                {questions.length !== 1 && (
                  <Button onClick={handleNext} className={classes.button}>
                    <Typography variant="h6">
                      {index < questions.length - 1 ? 'Next' : 'Back to Quests'}
                    </Typography>
                  </Button>
                )}
              </Grid>
            </div>
          </StudentBoard>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Attempted;
