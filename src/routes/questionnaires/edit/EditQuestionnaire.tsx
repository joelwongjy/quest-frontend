import React, { Dispatch, useEffect, useReducer } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import { EDIT, QUESTIONNAIRES } from 'constants/routes';
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
} from 'reducers/questionnaireDux';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import {
  QuestionnaireData,
  QuestionnairePostData,
} from 'interfaces/api/questionnaires';
import QuestButton from 'componentWrappers/questButton';
import {
  QuestionWindow,
  QuestionOrder,
  OptionData,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import { validateQuestionnaire } from 'utils/questionnaireUtils';
import { RootState } from 'reducers/rootReducer';

import { useStyles } from './editQuestionnaire.styles';
import EditAccordion from '../editAccordion';
import AssignAccordion from '../assignAccordion';
import DateAccordion from '../dateAccordion';

interface RouteParams {
  id: string;
}

interface EditQuestionnaireState extends RouteState {
  classIds: number[];
  programmeIds: number[];
}

const EditQuestionnaire: React.FunctionComponent = () => {
  const { id } = useRouteMatch<RouteParams>({
    path: `${QUESTIONNAIRES}/:id${EDIT}`,
  })!.params;
  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnaireData = useSelector(selectQuestionnaire);
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();

  const { title, type, questionWindows } = questionnaire;

  const [state, setState] = useReducer(
    (s: EditQuestionnaireState, a: Partial<EditQuestionnaireState>) => ({
      ...s,
      ...a,
    }),
    {
      classIds: [],
      programmeIds: [],
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
        const response = await ApiService.get(`questionnaires/${id}`);
        const questionnaire = response.data as QuestionnaireData;
        if (!didCancel) {
          dispatch(setQuestionnaire(questionnaire));
          setState({
            classIds: questionnaire.classes ?? [],
            programmeIds: questionnaire.programmes ?? [],
            isLoading: false,
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
      text: `Editing ${title}`,
      href: `${QUESTIONNAIRES}/${id}${EDIT}`,
    },
  ];

  const programmeCallback = (newProgrammes: number[]) => {
    setState({ programmeIds: newProgrammes });
  };

  const questClassCallback = (newClasses: number[]) => {
    setState({ classIds: newClasses });
  };

  const clearQuestionnairePromise = (
    myDispatch: Dispatch<{ payload: undefined; type: string }>
  ) =>
    new Promise((resolve) => {
      myDispatch(clearQuestionnaire());
      resolve();
    });

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

  const handleComplete = async () => {
    if (!validateQuestionnaire(questionnaire)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    const filteredQuestionnaire = {
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
    const data: QuestionnairePostData = {
      ...filteredQuestionnaire,
      classes: state.classIds,
      programmes: state.programmeIds,
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

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div className={classes.paperContainer}>
        <Paper
          className={classes.paper}
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
            postEndDateCallback={(date: Date) => dispatch(setPostEndTime(date))}
          />
          <AssignAccordion
            user={user!}
            programmeIds={state.programmeIds}
            programmeCallback={programmeCallback}
            classIds={state.classIds}
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
    </PageContainer>
  );
};

export default EditQuestionnaire;
