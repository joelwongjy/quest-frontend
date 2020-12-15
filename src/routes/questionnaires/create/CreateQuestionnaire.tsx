import React, { Dispatch, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';
import PostIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import QuestButton from 'componentWrappers/questButton';
import { useUser } from 'contexts/UserContext';
import { RootState } from 'reducers/rootReducer';
import {
  QuestionnaireDux,
  setPostEndTime,
  setPostStartTime,
  setPreEndTime,
  setPreStartTime,
  setType,
  clearQuestionnaire,
  setProgrammes,
  setClasses,
} from 'reducers/questionnaireDux';
import QuestCard from 'componentWrappers/questCard';
import {
  QuestionnaireType,
  QuestionWindow,
  QuestionOrder,
  OptionData,
} from 'interfaces/models/questionnaires';
import ApiService from 'services/apiService';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import { useError } from 'contexts/ErrorContext';
import {
  isEmptyQuestionnaire,
  validateQuestionnaire,
} from 'utils/questionnaireUtils';

import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';

import { useWindowSize } from 'utils/windowUtils';
import SampleQuestionMenu from 'components/sampleQuestionMenu';
import DateAccordion from '../dateAccordion';
import AssignAccordion from '../assignAccordion';
import EditAccordion from '../editAccordion';
import { useStyles } from './createQuestionnaire.styles';

interface CreateQuestionnaireState extends RouteState {
  isTypeSelected: boolean;
  isCompleted: boolean;
}

const CreateQuestionnaire: React.FunctionComponent = () => {
  const user = useUser();
  const muiClasses = useStyles();
  const history = useHistory();
  const { setHasError } = useError();
  const { width } = useWindowSize();

  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnairePostData = useSelector(selectQuestionnaire);
  const { type, questionWindows, classes, programmes } = questionnaire;

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  const [state, setState] = useReducer(
    (s: CreateQuestionnaireState, a: Partial<CreateQuestionnaireState>) => ({
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
      isTypeSelected: !isEmptyQuestionnaire(questionnaire),
      isCompleted: false,
    }
  );

  const alertCallback = (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler?: () => void,
    cancelHandler?: () => void
  ) => {
    setState({
      isAlertOpen,
      hasConfirm,
      alertHeader,
      alertMessage,
    });
    if (confirmHandler) {
      setState({
        confirmHandler: () => {
          confirmHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ confirmHandler: () => setState({ isAlertOpen: false }) });
    }
    if (cancelHandler) {
      setState({
        cancelHandler: () => {
          cancelHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ cancelHandler: () => setState({ isAlertOpen: false }) });
    }
  };

  const programmeCallback = (newProgrammes: number[]) => {
    dispatch(setProgrammes(newProgrammes));
  };

  const questClassCallback = (newClasses: number[]) => {
    dispatch(setClasses(newClasses));
  };

  const handleSelectSingle = () => {
    dispatch(setType(QuestionnaireType.ONE_TIME));
    setState({ isTypeSelected: true });
  };

  const handleSelectPrePost = () => {
    dispatch(setType(QuestionnaireType.PRE_POST));
    setState({ isTypeSelected: true });
  };

  const clearQuestionnairePromise = (
    myDispatch: Dispatch<{ payload: undefined; type: string }>
  ) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new Promise<void>((resolve, _reject) => {
      myDispatch(clearQuestionnaire());
      resolve();
    });

  const handleComplete = async () => {
    if (!validateQuestionnaire(questionnaire)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setState({ isCompleted: true });
  };

  const handleSubmit = async () => {
    const data = {
      ...questionnaire,
      questionWindows: questionnaire.questionWindows.map(
        (q: QuestionWindow) => ({
          ...q,
          questions: q.questions.map((q2: QuestionOrder) => ({
            ...q2,
            options: q2.options.filter((o: OptionData) => o.optionText !== ''),
          })),
        })
      ),
    };
    if (data.type === QuestionnaireType.ONE_TIME) {
      data.sharedQuestions = { questions: [] };
      data.questionWindows = [data.questionWindows[0]];
    }
    const response = await ApiService.post('questionnaires/create', data);
    if (response.status === 200) {
      clearQuestionnairePromise(dispatch).then(() =>
        history.push(QUESTIONNAIRES)
      );
    }
  };

  const renderQuestionnaire = () => {
    return (
      <PageContainer>
        {state.isTypeSelected && (
          <SampleQuestionMenu type={questionnaire.type} />
        )}
        <PageHeader breadcrumbs={breadcrumbs} />
        {!state.isTypeSelected ? (
          <>
            <Grid
              container
              justify="center"
              style={{ marginTop: '3rem', marginBottom: '2rem' }}
            >
              <Typography
                style={{ fontSize: 24, fontWeight: 'bold', color: 'grey' }}
              >
                What type of questionnaire would you like to create?
              </Typography>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <Grid item>
                <QuestCard
                  className={muiClasses.typeCard}
                  onClick={handleSelectSingle}
                >
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <SingleIcon style={{ fontSize: 72 }} />
                    </Grid>
                    <Grid item>Single</Grid>
                  </Grid>
                </QuestCard>
              </Grid>
              <Grid item>
                <QuestCard
                  className={muiClasses.typeCard}
                  onClick={handleSelectPrePost}
                >
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <SingleIcon style={{ fontSize: 72 }} />
                      <PostIcon style={{ fontSize: 72 }} />
                    </Grid>
                    <Grid item>Pre-Post Set</Grid>
                  </Grid>
                </QuestCard>
              </Grid>
            </Grid>
          </>
        ) : (
          <div
            className={muiClasses.paperContainer}
            style={{
              width:
                // eslint-disable-next-line no-nested-ternary
                width! < 720
                  ? width! - 50
                  : width! < 960
                  ? width! - 290
                  : width! - 530,
            }}
          >
            <Paper
              className={muiClasses.paper}
              elevation={0}
              style={{ background: 'white' }}
            >
              <DateAccordion
                type={type}
                preStartDate={new Date(questionWindows[0].startAt)}
                preStartDateCallback={(date: Date) =>
                  dispatch(setPreStartTime(date))
                }
                preEndDate={new Date(questionWindows[0].endAt)}
                preEndDateCallback={(date: Date) =>
                  dispatch(setPreEndTime(date))
                }
                postStartDate={
                  questionWindows.length > 1
                    ? new Date(questionWindows[1].startAt)
                    : undefined
                }
                postStartDateCallback={(date: Date) =>
                  dispatch(setPostStartTime(date))
                }
                postEndDate={
                  questionWindows.length > 1
                    ? new Date(questionWindows[1].endAt)
                    : undefined
                }
                postEndDateCallback={(date: Date) =>
                  dispatch(setPostEndTime(date))
                }
              />
              <AssignAccordion
                user={user!}
                programmeIds={programmes ?? []}
                programmeCallback={programmeCallback}
                classIds={classes ?? []}
                classCallback={questClassCallback}
              />
              <EditAccordion
                questionnaire={questionnaire}
                alertCallback={alertCallback}
              />
              <Grid container justify="flex-end">
                <QuestButton onClick={handleComplete} fullWidth>
                  Finish
                </QuestButton>
              </Grid>
            </Paper>
          </div>
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

  const renderPublishWarning = () => {
    return (
      <PageContainer>
        <PageHeader breadcrumbs={breadcrumbs} />
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ marginTop: '2rem', paddingBottom: '4rem' }}
        >
          <Grid item xs={12} md={9}>
            <QuestCard>
              <Grid item container xs={12} className={muiClasses.header}>
                <Grid container alignItems="center" justify="space-between">
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ color: 'white' }}
                  >
                    Publish Questionnaire
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <List className={muiClasses.list}>
                  <ListItem>
                    <Typography variant="subtitle1">
                      You are about to publish a new questionnaire with the
                      title&nbsp;
                      <span style={{ color: '#044682' }}>
                        {`${questionnaire.title}.`}
                      </span>
                    </Typography>
                  </ListItem>
                  {questionnaire.classes && questionnaire.classes.length > 0 ? (
                    <ListItem>
                      <Typography variant="subtitle1">
                        The questionnaire is assigned to&nbsp;
                        <span style={{ color: '#044682' }}>
                          {user!.programmes.map((p) => {
                            const filteredClasses = user!.classes.filter(
                              (c) =>
                                c.programme.id === p.id &&
                                questionnaire.classes?.indexOf(c.id) !== -1
                            );
                            return (
                              <>
                                {filteredClasses.map((c, index) => {
                                  return (
                                    <>
                                      {`${p.name} - ${c.name}`}
                                      {index === filteredClasses.length - 1
                                        ? '.'
                                        : ','}
                                      &nbsp;
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
                        </span>
                        Please verify if you have assigned the questionnaire to
                        the intended recipieints. Else, please click on the back
                        button to change the assignment.
                      </Typography>
                    </ListItem>
                  ) : (
                    <ListItem>
                      <Typography variant="subtitle1">
                        <span style={{ color: 'red' }}>
                          NOTE: The questionnaire is currently not assigned to
                          any class nor programme. You can assign it later when
                          editing it.
                        </span>
                      </Typography>
                    </ListItem>
                  )}
                  <ListItem>
                    <Typography variant="subtitle1">
                      {`Once you click on Proceed, the questionnaire will be
                      released to the intended recipients automatically on
                      ${format(
                        questionnaire.questionWindows[0].startAt,
                        'dd MMM yyyy HH:mm'
                      )} with no futher action required.`}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={2} justify="flex-end">
                      <QuestButton
                        className={muiClasses.button}
                        variant="outlined"
                        onClick={() => setState({ isCompleted: false })}
                      >
                        Back
                      </QuestButton>
                      <QuestButton
                        className={muiClasses.button}
                        onClick={handleSubmit}
                      >
                        Proceed
                      </QuestButton>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </QuestCard>
          </Grid>
        </Grid>
      </PageContainer>
    );
  };

  return (
    <>{state.isCompleted ? renderPublishWarning() : renderQuestionnaire()}</>
  );
};

export default CreateQuestionnaire;
