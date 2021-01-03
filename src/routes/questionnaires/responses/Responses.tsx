import React, { useEffect, useReducer, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { QUESTIONNAIRES, RESPONSES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import { AttemptFullData } from 'interfaces/models/attempts';
import { RouteState } from 'interfaces/routes/common';
import { useUser } from 'contexts/UserContext';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';
import QuestAlert from 'componentWrappers/questAlert';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';
import {
  QuestionAccessibility,
  QuestionnaireFullData,
} from 'interfaces/models/questionnaires';
import ViewQuestionCard from 'components/questionCard/view';

import { attempt } from '../mockData';
import { useStyles } from './responses.styles';

interface RouteParams {
  id: string;
}

interface ResponsesState extends RouteState {
  questionnaire: QuestionnaireFullData | undefined;
  accessibleProgrammes: { id: number; name: string }[];
  currentAttempt: AttemptFullData | undefined;
  currentProgrammeId: number | undefined;
  currentClassId: number | undefined;
  currentStudentId: number | undefined;
}

const Responses: React.FunctionComponent = () => {
  const { id } = useRouteMatch<RouteParams>({
    path: `${QUESTIONNAIRES}/:id${RESPONSES}`,
  })!.params;

  const classes = useStyles();
  const user = useUser();

  const [state, setState] = useReducer(
    (s: ResponsesState, a: Partial<ResponsesState>) => ({
      ...s,
      ...a,
    }),
    {
      questionnaire: undefined,
      accessibleProgrammes: [],
      currentAttempt: attempt,
      currentProgrammeId: undefined,
      currentClassId: undefined,
      currentStudentId: undefined,
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

  const [isPre, setIsPre] = useState<boolean>(true);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`questionnaires/${id}`);
        const questionnaire = response.data as QuestionnaireFullData;
        if (!didCancel) {
          if (parseInt(id, 10) === questionnaire.questionnaireId) {
            setState({
              isLoading: false,
              questionnaire,
            });
            const programmes: { id: number; name: string }[] = [];
            questionnaire.classes.forEach((c) => {
              user!.programmes.forEach((p) => {
                if (
                  p.classes.filter((x) => x.id === c.id).length > 0 &&
                  programmes.find((p2) => p2.id === p.id) === undefined
                ) {
                  programmes.push({ id: p.id, name: p.name });
                }
              });
            });
            setState({ accessibleProgrammes: programmes });
          } else {
            setState({
              isLoading: false,
              questionnaire,
            });
          }
        }
      } catch (error) {
        setState({
          isLoading: false,
          isAlertOpen: true,
          hasConfirm: false,
          alertHeader: 'Something went wrong',
          alertMessage: 'Please refresh and try again later.',
        });
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const fetchAttempt = async (id: number) => {
    try {
      const response = await ApiService.get(
        `questionnaires/${state.questionnaire!.questionnaireId}/student/${id}`
      );
      const attempt = response.data as AttemptFullData;
      setState({ currentAttempt: attempt });
    } catch (error) {
      setState({
        isAlertOpen: true,
        hasConfirm: false,
        alertHeader: 'Something went wrong',
        alertMessage: 'Please refresh and try again later.',
      });
    }
  };

  const alertCallback = getAlertCallback(setState);

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    {
      text: `Viewing Responses for ${state.questionnaire?.title}`,
      href: `${QUESTIONNAIRES}/${id}${RESPONSES}`,
    },
  ];

  const renderShared = () => {
    const preArray = state.currentAttempt?.answersShared?.sharedAnswersBefore
      .slice()
      .sort((x, y) => x.questionOrder.order - y.questionOrder.order);

    const postArray = state.currentAttempt?.answersShared?.sharedAnswersAfter
      .slice()
      .sort((x, y) => x.questionOrder.order - y.questionOrder.order);

    let result = [];
    if (!preArray && !postArray) {
      return null;
    }
    if (!postArray) {
      result = preArray!.map((a) => (
        <ViewQuestionCard
          key={`shared-answer-${a.answerId}`}
          question={a.questionOrder}
          answerBefore={a}
          accessibility={QuestionAccessibility.SHARED}
          alertCallback={alertCallback}
          headerStyles={classes.sharedHeader}
        />
      ));
    } else if (!preArray) {
      result = postArray!.map((a) => (
        <ViewQuestionCard
          key={`shared-answer-${a.answerId}`}
          question={a.questionOrder}
          answerAfter={a}
          accessibility={QuestionAccessibility.SHARED}
          alertCallback={alertCallback}
          headerStyles={classes.sharedHeader}
        />
      ));
    } else {
      for (let i = 0; i < preArray?.length; i += 1) {
        const postIndex = postArray.findIndex(
          (a) =>
            a.questionOrder.qnOrderId === preArray[i].questionOrder.qnOrderId
        );
        if (postIndex === -1) {
          result.push(
            <ViewQuestionCard
              key={`shared-answer-${preArray[i].answerId}`}
              question={preArray[i].questionOrder}
              answerBefore={preArray[i]}
              accessibility={QuestionAccessibility.SHARED}
              alertCallback={alertCallback}
              headerStyles={classes.sharedHeader}
            />
          );
        } else {
          result.push(
            <ViewQuestionCard
              key={`shared-answer-${preArray[i].answerId}`}
              question={preArray[i].questionOrder}
              answerAfter={postArray[postIndex]!}
              answerBefore={preArray[i]}
              accessibility={QuestionAccessibility.SHARED}
              alertCallback={alertCallback}
              headerStyles={classes.sharedHeader}
            />
          );
          postArray.splice(postIndex, 1);
        }
      }
      for (let i = 0; i < postArray?.length; i += 1) {
        result.push(
          <ViewQuestionCard
            key={`shared-answer-${postArray[i].answerId}`}
            question={postArray[i].questionOrder}
            answerAfter={postArray[i]}
            accessibility={QuestionAccessibility.SHARED}
            alertCallback={alertCallback}
            headerStyles={classes.sharedHeader}
          />
        );
      }
    }
    return <>{result}</>;
  };

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid container justify="center">
        <Typography variant="h5" className={classes.title}>
          {state.questionnaire?.title
            ? `${state.questionnaire?.title} - Responses`
            : 'Loading...'}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
            focused={state.currentProgrammeId === undefined}
            color="secondary"
          >
            <InputLabel id="programme-select-outlined-label">
              Programme
            </InputLabel>
            <Select
              labelId="programme-select-outlined-label"
              id="programme-select-outlined"
              value={state.currentProgrammeId ?? ''}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                const newProgrammeId = Number(event.target.value);
                if (newProgrammeId !== state.currentProgrammeId) {
                  setState({
                    currentProgrammeId: event.target.value as number,
                    currentClassId: undefined,
                    currentStudentId: undefined,
                  });
                }
              }}
              label="Programme"
            >
              {state.accessibleProgrammes.map((x) => {
                return (
                  <MenuItem key={x.id} value={x.id}>
                    {user!.programmes.find((p) => p.id === x.id)?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            key={state.currentClassId}
            variant="outlined"
            className={classes.formControl}
            size="small"
            focused={
              state.currentProgrammeId !== undefined &&
              state.currentClassId === undefined
            }
            color="secondary"
          >
            <InputLabel id="class-select-outlined-label">Class</InputLabel>
            <Select
              labelId="class-select-outlined-label"
              id="class-select-outlined"
              value={state.currentClassId ?? ''}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setState({ currentClassId: event.target.value as number });
              }}
              label="Class"
              disabled={state.currentProgrammeId === undefined}
            >
              {user!.programmes
                .find((y) => y.id === state.currentProgrammeId)
                ?.classes.filter(
                  (c) =>
                    state.questionnaire!.classes.filter((y) => y.id === c.id)
                      .length > 0
                )
                .map((x) => {
                  return (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            focused={
              state.currentProgrammeId !== undefined &&
              state.currentClassId !== undefined &&
              state.currentStudentId === undefined
            }
            color="secondary"
            className={classes.formControlName}
            size="small"
          >
            <InputLabel id="name-select-outlined-label">Student</InputLabel>
            <Select
              labelId="student-select-outlined-label"
              id="student-select-outlined"
              value={state.currentStudentId ?? ''}
              disabled={
                state.currentProgrammeId === undefined ||
                state.currentClassId === undefined
              }
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setState({ currentStudentId: event.target.value as number });
                fetchAttempt(event.target.value as number);
              }}
              label="Student"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {state.currentProgrammeId === undefined ||
      state.currentClassId === undefined ? (
        <Grid container justify="center" style={{ marginTop: '2rem' }}>
          <Typography>
            Please specify the programme, class and student to view the attempt.
          </Typography>
        </Grid>
      ) : (
        <>
          {state.currentAttempt?.answers && (
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={9}>
                <div className={classes.root}>
                  {attempt.answers
                    ?.sort(
                      (x, y) => x.questionOrder.order - y.questionOrder.order
                    )
                    .map((ans) => {
                      const question = ans.questionOrder;
                      return (
                        <ViewQuestionCard
                          key={`single-answer-${ans.answerId}`}
                          question={question}
                          answer={ans}
                          accessibility={QuestionAccessibility.PRE}
                          alertCallback={alertCallback}
                          headerStyles={classes.sharedHeader}
                        />
                      );
                    })}
                </div>
              </Grid>
            </Grid>
          )}
          {state.currentAttempt?.answersShared && (
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={9}>
                <Paper className={classes.paper}>
                  <Grid container justify="center">
                    <Typography
                      variant="h6"
                      style={{
                        textDecoration: 'underline',
                        marginTop: '0.5rem',
                      }}
                    >
                      Shared Questions
                    </Typography>
                  </Grid>
                  {renderShared()}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={10} md={9}>
                <Paper
                  className={classes.paper}
                  style={{ marginBottom: '3rem' }}
                >
                  <Grid
                    container
                    justify="space-between"
                    style={{ marginTop: '0.5rem' }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        paddingLeft: '1rem',
                        textDecoration: 'underline',
                      }}
                    >
                      {isPre
                        ? 'Pre-Programme Questions'
                        : 'Post-Programme Questions'}
                    </Typography>
                    <div className={classes.modeSwitch}>
                      Pre
                      <Switch onChange={() => setIsPre((state) => !state)} />
                      Post
                    </div>
                  </Grid>
                  <div className={classes.root}>
                    {isPre
                      ? state.currentAttempt?.answersBefore
                          ?.sort(
                            (x, y) =>
                              x.questionOrder.order - y.questionOrder.order
                          )
                          .map((ans) => {
                            const question = ans.questionOrder;
                            return (
                              <ViewQuestionCard
                                key={`pre-answer-${ans.answerId}`}
                                question={question}
                                answer={ans}
                                accessibility={QuestionAccessibility.PRE}
                                alertCallback={alertCallback}
                                headerStyles={classes.preHeader}
                              />
                            );
                          })
                      : state.currentAttempt?.answersAfter
                          ?.sort(
                            (x, y) =>
                              x.questionOrder.order - y.questionOrder.order
                          )
                          .map((ans) => {
                            const question = ans.questionOrder;
                            return (
                              <ViewQuestionCard
                                key={`pre-answer-${ans.answerId}`}
                                question={question}
                                answer={ans}
                                accessibility={QuestionAccessibility.POST}
                                alertCallback={alertCallback}
                                headerStyles={classes.postHeader}
                              />
                            );
                          })}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          )}
        </>
      )}
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

export default Responses;
