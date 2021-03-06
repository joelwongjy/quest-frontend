import React, { Dispatch, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import PostIcon from '@material-ui/icons/Description';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import SampleQuestionMenu from 'components/sampleQuestionMenu';
import QuestAlert from 'componentWrappers/questAlert';
import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import { CREATE, HOME, QUESTIONNAIRES } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import {
  QuestionnaireMode,
  QuestionnairePostData,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import { RouteState } from 'interfaces/routes/common';
import {
  clearQuestionnaire,
  QuestionnaireDux,
  setClasses,
  setPostEndTime,
  setPostStartTime,
  setPreEndTime,
  setPreStartTime,
  setProgrammes,
  setType,
} from 'reducers/questionnaireDux';
import { RootState } from 'reducers/rootReducer';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';
import {
  isEmptyQuestionnaire,
  isValidQuestionnaire,
  processCreateQuestionnaire,
} from 'utils/questionnaireUtils';
import { useWindowSize } from 'utils/windowUtils';

import AssignAccordion from '../assignAccordion';
import ConfirmationPage from '../ConfirmationPage';
import DateAccordion from '../dateAccordion';
import EditAccordion from '../editAccordion';

import { useStyles } from './createQuestionnaire.styles';

interface CreateQuestionnaireState extends RouteState {
  isTypeSelected: boolean;
  isCompleted: boolean;
}

const CreateQuestionnaire: React.FunctionComponent = () => {
  const { user } = useUser();
  const muiClasses = useStyles();
  const history = useHistory();
  const { setHasError } = useError();
  const { width } = useWindowSize();

  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnaireDux = useSelector(selectQuestionnaire);
  const { type, questionWindows, programmes, classes } = questionnaire;

  const breadcrumbs = [
    { text: 'Home', href: HOME },
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

  const alertCallback = getAlertCallback(setState);

  const programmeCallback = (newProgrammes: { id: number; name: string }[]) => {
    dispatch(setProgrammes(newProgrammes));
  };

  const classCallback = (newClasses: { id: number; name: string }[]) => {
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
    if (!isValidQuestionnaire(questionnaire)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setState({ isCompleted: true });
  };

  const handleSubmit = async () => {
    const data: QuestionnairePostData =
      processCreateQuestionnaire(questionnaire);
    if (data.type === QuestionnaireType.ONE_TIME) {
      data.sharedQuestions = { questions: [] };
      data.questionWindows = [data.questionWindows[0]];
    }
    await ApiService.post('questionnaires/create', data);
    clearQuestionnairePromise(dispatch).then(() => {
      history.push(QUESTIONNAIRES);
    });
  };

  const renderQuestionnaire = () => {
    return (
      <PageContainer>
        {state.isTypeSelected && (
          <SampleQuestionMenu type={questionnaire.type} />
        )}
        <PageHeader breadcrumbs={breadcrumbs} />
        {!state.isTypeSelected ? (
          <div style={{ marginTop: '1rem' }}>
            <Grid container justify="center">
              <Typography
                style={{ fontSize: 24, color: 'grey' }}
                align="center"
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
          </div>
        ) : (
          <div
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
            <Grid container justify="center">
              <Grid item xs={12} md={10}>
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
                  selectedProgrammes={programmes}
                  selectedClasses={classes}
                  programmeCallback={programmeCallback}
                  classCallback={classCallback}
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
              </Grid>
            </Grid>
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

  return (
    <>
      {state.isCompleted ? (
        <ConfirmationPage
          breadcrumbs={breadcrumbs}
          questionnaire={questionnaire}
          handleCancel={() => setState({ isCompleted: false })}
          handleSubmit={handleSubmit}
          headerClassName={muiClasses.header}
          listClassName={muiClasses.list}
          buttonClassName={muiClasses.button}
          mode={QuestionnaireMode.CREATE}
        />
      ) : (
        renderQuestionnaire()
      )}
    </>
  );
};

export default CreateQuestionnaire;
