import React, { Dispatch, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import { DUPLICATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import {
  setPreStartTime,
  setPreEndTime,
  setPostStartTime,
  setPostEndTime,
  clearQuestionnaire,
  QuestionnaireDux,
  setQuestionnaire,
  setClasses,
  setProgrammes,
} from 'reducers/questionnaireDux';
import ApiService from 'services/apiService';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import {
  QuestionnaireFullData,
  QuestionnaireMode,
  QuestionnairePostData,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import QuestButton from 'componentWrappers/questButton';
import {
  convertToQuestionnaireDux,
  isValidQuestionnaire,
  processCreateQuestionnaire,
} from 'utils/questionnaireUtils';
import { RootState } from 'reducers/rootReducer';
import QuestAlert from 'componentWrappers/questAlert';
import SampleQuestionMenu from 'components/sampleQuestionMenu';
import { useWindowSize } from 'utils/windowUtils';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './duplicateQuestionnaire.styles';
import EditAccordion from '../editAccordion';
import AssignAccordion from '../assignAccordion';
import DateAccordion from '../dateAccordion';
import ConfirmationPage from '../ConfirmationPage';

interface DuplicateQuestionnaireState extends RouteState {
  isCompleted: boolean;
}

const DuplicateQuestionnaire: React.FunctionComponent = () => {
  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnaireDux = useSelector(selectQuestionnaire);
  const { user } = useUser();
  const muiClasses = useStyles();
  const history = useHistory();
  const { setHasError } = useError();
  const { width } = useWindowSize();

  const { title, type, questionWindows, programmes, classes } = questionnaire;

  const [state, setState] = useReducer(
    (
      s: DuplicateQuestionnaireState,
      a: Partial<DuplicateQuestionnaireState>
    ) => ({
      ...s,
      ...a,
    }),
    {
      isCompleted: false,
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

    const setQuestionnairePromise = (
      myDispatch: Dispatch<{ payload: QuestionnaireDux }>,
      questionnaire: QuestionnaireDux
    ) =>
      new Promise<void>((resolve) => {
        myDispatch(setQuestionnaire(questionnaire));
        resolve();
      });

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`questionnaires/${id}`);
        const questionnaire = convertToQuestionnaireDux(
          response.data as QuestionnaireFullData,
          QuestionnaireMode.DUPLICATE
        );

        if (!didCancel) {
          setQuestionnairePromise(dispatch, questionnaire).then(() => {
            setState({
              isLoading: false,
            });
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isError: true, isLoading: false });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    {
      text: `Duplicate ${title}`,
      href: `${QUESTIONNAIRES}/${id}${DUPLICATE}`,
    },
  ];

  const programmeCallback = (newProgrammes: { id: number; name: string }[]) => {
    dispatch(setProgrammes(newProgrammes));
  };

  const classCallback = (newClasses: { id: number; name: string }[]) => {
    dispatch(setClasses(newClasses));
  };

  const clearQuestionnairePromise = (
    myDispatch: Dispatch<{ payload: undefined; type: string }>
  ) =>
    new Promise<void>((resolve) => {
      myDispatch(clearQuestionnaire());
      resolve();
    });

  const alertCallback = getAlertCallback(setState);

  const handleComplete = async () => {
    if (!isValidQuestionnaire(questionnaire)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setState({ isCompleted: true });
  };

  const handleSubmit = async () => {
    const data: QuestionnairePostData = processCreateQuestionnaire(
      questionnaire
    );
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
        <SampleQuestionMenu type={questionnaire.type} />
        <PageHeader breadcrumbs={breadcrumbs} />
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
              preEndDateCallback={(date: Date) => dispatch(setPreEndTime(date))}
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
          </Paper>
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
          mode={QuestionnaireMode.DUPLICATE}
        />
      ) : (
        renderQuestionnaire()
      )}
    </>
  );
};
export default DuplicateQuestionnaire;
