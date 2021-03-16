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

import ProgressBar from './ProgressBar';
import AttemptGhost from './AttemptGhost';
import { useStyles } from './attempt.styles';

const Attempt: React.FC = () => {
  const { id, windowId } = useParams<WindowRouteParams>();
  const classes = useStyles();
  const { setHasError } = useError();
  const history = useHistory();

  const dispatch = useDispatch();
  const selectAttempt = (state: RootState): AttemptDux => state.attempt;
  const { quest, attempt, index } = useSelector(selectAttempt);

  const [state, setState] = useReducer(
    (s: RouteState, a: Partial<RouteState>) => ({
      ...s,
      ...a,
    }),
    {
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
        clearAttemptPromise(dispatch).then(() => history.push(QUESTS));
      }
    } catch (error) {
      setState({ isError: true });
    }
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
                    attempt?.answers.find(
                      (a) => a.questionOrderId === questions[index].qnOrderId
                    ) ?? undefined
                  }
                  answerCallback={answerCallback}
                />
              </div>
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
            </div>
          </StudentBoard>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Attempt;
