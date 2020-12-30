import React, { Dispatch, useEffect, useReducer } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import { QUESTS } from 'constants/routes';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { RootState } from 'reducers/rootReducer';
import {
  AttemptDux,
  clearAttempt,
  setAttempt,
  updateAnswer,
} from 'reducers/attemptDux';
import AttemptQuestionCard from 'components/questionCard/attempt';
import { sortByOrder } from 'utils/sortingUtils';
import { AnswerPostData } from 'interfaces/models/answers';
import QuestButton from 'componentWrappers/questButton';
import { isQuestComplete } from 'utils/questUtils';
import { useError } from 'contexts/ErrorContext';

import { useStyles } from './attempt.styles';

interface RouteParams {
  id: string;
  windowId: string;
}

const Attempt: React.FC = () => {
  const { id, windowId } = useRouteMatch<RouteParams>({
    path: `${QUESTS}/:id/window/:windowId`,
  })!.params;
  const classes = useStyles();
  const { setHasError } = useError();
  const history = useHistory();

  const dispatch = useDispatch();
  const selectAttempt = (state: RootState): AttemptDux => state.attempt;
  const { quest, attempt } = useSelector(selectAttempt);

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
      if (quest && quest.windowId === Number(windowId)) {
        setState({ isLoading: false });
        return;
      }
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
  }, [quest, windowId, dispatch]);

  const breadcrumbs = [
    { text: 'Quests', href: QUESTS },
    {
      text: quest ? `Attempting ${quest.title}` : 'Loading',
      href: `${QUESTS}/${id}/window/${windowId}`,
    },
  ];

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
    // return <AttemptGhost />
    return <></>;
  }

  if (state.isError) {
    return <></>; // TODO: Add error handling
  }

  const answerCallback = (answer: AnswerPostData): void => {
    dispatch(updateAnswer(answer));
  };

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Typography align="center" variant="h5" className={classes.title}>
        {quest?.title}
      </Typography>
      {quest?.sharedQuestions?.questions &&
        quest?.sharedQuestions.questions
          .slice()
          .sort(sortByOrder)
          .map((q) => {
            const answer =
              attempt?.answers?.find(
                (a) => a.questionOrderId === q.qnOrderId
              ) ?? undefined;
            return (
              <div key={`question-card-${q.qnOrderId}`}>
                <AttemptQuestionCard
                  question={q}
                  answer={answer}
                  answerCallback={answerCallback}
                />
              </div>
            );
          })}
      {quest?.questions
        .slice()
        .sort(sortByOrder)
        .map((q) => {
          const answer =
            attempt?.answers?.find((a) => a.questionOrderId === q.qnOrderId) ??
            undefined;
          return (
            <div key={`question-card-${q.qnOrderId}`}>
              <AttemptQuestionCard
                question={q}
                answer={answer}
                answerCallback={answerCallback}
              />
            </div>
          );
        })}
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} sm={8}>
          <QuestButton
            fullWidth
            className={classes.button}
            onClick={handleSubmit}
          >
            Complete Quest!
          </QuestButton>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Attempt;
