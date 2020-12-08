import React, { Dispatch, useEffect, useReducer, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
} from 'reducers/questionnaireDux';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
// import QuestButton from 'componentWrappers/questButton';

import QuestButton from 'componentWrappers/questButton';

import {
  QuestionWindow,
  QuestionOrder,
  OptionData,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import { validateQuestionnaire } from 'utils/questionnaireUtils';
import { questionnaire } from '../mockData';
import { useStyles } from './editQuestionnaire.styles';
import EditAccordion from '../editAccordion';
import AssignAccordion from '../assignAccordion';
import DateAccordion from '../dateAccordion';

interface RouteParams {
  id: string;
}

interface EditQuestionnaireState extends RouteState {
  questionnaire: QuestionnairePostData;
}

const EditQuestionnaire: React.FunctionComponent = () => {
  const { id } = useRouteMatch<RouteParams>({
    path: `${QUESTIONNAIRES}/:id${EDIT}`,
  })!.params;

  const [state, setState] = useReducer(
    (s: EditQuestionnaireState, a: Partial<EditQuestionnaireState>) => ({
      ...s,
      ...a,
    }),
    {
      questionnaire,
      isLoading: true,
      isError: false,
      isDialogOpen: false,
      errorHeader: '',
      errorMessage: '',
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`questionnaires/${id}`);
        const questionnaire = response.data as QuestionnairePostData;
        if (!didCancel) {
          setState({
            questionnaire,
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

  const {
    title,
    type,
    questionWindows,
    classes,
    programmes,
  } = state.questionnaire;

  const user = useUser();
  const style = useStyles();
  const history = useHistory();
  const { setHasError } = useError();
  const [programmeIds, setProgrammeIds] = useState<number[]>(programmes!);
  const [classIds, setClassIds] = useState<number[]>(classes!);

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    {
      text: `Editing ${title}`,
      href: `${QUESTIONNAIRES}/${id}${EDIT}`,
    },
  ];

  const programmeCallback = (newProgrammes: number[]) => {
    setProgrammeIds(newProgrammes);
  };

  const questClassCallback = (newClasses: number[]) => {
    setClassIds(newClasses);
  };

  const clearQuestionnairePromise = (
    myDispatch: Dispatch<{ payload: undefined; type: string }>
  ) =>
    new Promise((resolve) => {
      myDispatch(clearQuestionnaire());
      resolve();
    });

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
      classes: classIds,
      programmes: programmeIds,
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
      <div className={style.paperContainer}>
        <Paper
          className={style.paper}
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
            programmeIds={programmeIds}
            programmeCallback={programmeCallback}
            classIds={classIds}
            classCallback={questClassCallback}
          />
          <EditAccordion questionnaire={state.questionnaire} />
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
