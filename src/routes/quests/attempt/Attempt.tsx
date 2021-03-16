import React, { Dispatch, useEffect, useReducer } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';

import { QUESTS } from 'constants/routes';
import { RouteState, WindowRouteParams } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';
import { RootState } from 'reducers/rootReducer';
import {
  AttemptDux,
  clearAttempt,
  setAttempt,
  updateAnswer,
  previousQuestion,
  nextQuestion,
} from 'reducers/attemptDux';
import AttemptQuestionCard from 'components/questionCard/attempt';
import { sortByOrder } from 'utils/sortingUtils';
import { AnswerPostData } from 'interfaces/models/answers';
import { isQuestComplete, isQuestionComplete } from 'utils/questUtils';
import { useError } from 'contexts/ErrorContext';
import StudentBoard from 'components/studentBoard';
import QuestAlert from 'componentWrappers/questAlert';
import { getAlertCallback } from 'utils/alertUtils';
import medalImage from 'assets/images/student/medal.png';

import ProgressBar from './ProgressBar';
import AttemptGhost from './AttemptGhost';
import { useStyles } from './attempt.styles';

interface AttemptState extends RouteState {
  isComplete: boolean;
}

const Attempt: React.FC = () => {
  const { id, windowId } = useParams<WindowRouteParams>();
  const classes = useStyles();
  const { setHasError } = useError();
  const history = useHistory();

  const dispatch = useDispatch();
  const selectAttempt = (state: RootState): AttemptDux => state.attempt;
  const { quest, attempt, index } = useSelector(selectAttempt);

  const [state, setState] = useReducer(
    (s: AttemptState, a: Partial<AttemptState>) => ({
      ...s,
      ...a,
    }),
    {
      isComplete: false,
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
          `questionnaires/${id}/window/${windowId}`
        );
        if (!didCancel) {
          dispatch(setAttempt(response.data));
          setState({
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
  }, [windowId, dispatch]);

  const alertCallback = getAlertCallback(setState);

  const clearAttemptPromise = (
    myDispatch: Dispatch<{ payload: undefined; type: string }>
  ) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new Promise<void>((resolve, _reject) => {
      myDispatch(clearAttempt());
      resolve();
    });

  const handleSubmit = async () => {
    if (!quest || !attempt || !isQuestComplete(quest, attempt)) {
      setHasError(true);
    }
    setHasError(false);
    try {
      const response = await ApiService.post(
        '/questionnaires/submissions',
        attempt
      );
      if (response.status === 200) {
        setState({ isComplete: true });
      } else {
        alertCallback(
          true,
          false,
          'Uh oh!',
          'Something went wrong! Please refresh and try again!'
        );
      }
    } catch (error) {
      setState({ isError: true });
    }
  };

  const handleBackToQuests = async () => {
    clearAttemptPromise(dispatch).then(() => history.push(QUESTS));
  };

  if (state.isLoading) {
    return <AttemptGhost />;
  }

  if (state.isError) {
    return <></>; // TODO: Add error handling
  }

  const answerCallback = (answer: AnswerPostData): void => {
    dispatch(updateAnswer(answer));
  };

  const questions = [
    ...(quest?.sharedQuestions?.questions.slice().sort(sortByOrder) ?? []),
    ...(quest?.questions.slice().sort(sortByOrder) ?? []),
  ];

  const question = questions[index];

  if (questions.length === 0 || !question) {
    return <Redirect to={QUESTS} />;
  }

  const handlePrevious = () => {
    if (index > 0) {
      dispatch(previousQuestion());
    } else {
      window.location.href = QUESTS;
    }
  };

  const handleNext = () => {
    if (!isQuestionComplete(question, attempt?.answers ?? [])) {
      setHasError(true);
      return;
    }
    setHasError(false);
    if (index < questions.length - 1) {
      dispatch(nextQuestion());
    } else {
      handleSubmit();
    }
  };

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} item justify="center">
          <StudentBoard
            title={quest?.title ?? 'Loading'}
            className={classes.board}
            accessory={
              <ProgressBar current={index + 1} total={questions.length} />
            }
          >
            <div className={classes.body}>
              <div className={classes.question}>
                {state.isComplete ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>Congratulations!</div>
                    <img
                      src={medalImage}
                      alt="Medal"
                      style={{ height: '15rem', margin: '1rem 0' }}
                    />
                    <div style={{ fontSize: '2rem' }}>
                      You have completed {quest?.title ?? 'the quest'}!
                    </div>
                  </div>
                ) : (
                  <AttemptQuestionCard
                    question={questions[index]}
                    answer={
                      attempt?.answers.find(
                        (a) => a.questionOrderId === questions[index].qnOrderId
                      ) ?? undefined
                    }
                    answerCallback={answerCallback}
                  />
                )}
              </div>
              {state.isComplete ? (
                <Grid container justify="flex-end">
                  <Button
                    onClick={handleBackToQuests}
                    className={classes.button}
                  >
                    <Typography variant="h6">View Other Quests</Typography>
                  </Button>
                </Grid>
              ) : (
                <Grid container justify="space-between">
                  <Button onClick={handlePrevious} className={classes.button}>
                    <Typography variant="h6">
                      {index > 0 ? 'Previous' : 'Back to Quests'}
                    </Typography>
                  </Button>
                  <Button onClick={handleNext} className={classes.button}>
                    <Typography variant="h6">
                      {index < questions.length - 1 ? 'Next' : 'Finish Quest'}
                    </Typography>
                  </Button>
                </Grid>
              )}
            </div>
          </StudentBoard>
        </Grid>
      </div>
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Attempt;
