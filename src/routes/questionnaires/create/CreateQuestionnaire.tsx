/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';
import PostIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';

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
import { validateQuestionnaire } from 'utils/questionnaireUtils';

import DateAccordion from '../dateAccordion';
import AssignAccordion from '../assignAccordion';
import EditAccordion from '../editAccordion';
import { useStyles } from './createQuestionnaire.styles';

const CreateQuestionnaire: React.FunctionComponent = () => {
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();
  const [programmeIds, setProgrammeIds] = useState<number[]>([]);
  const [classIds, setClassIds] = useState<number[]>([]);
  const [isTypeSelected, setIsTypeSelected] = useState<boolean>(false);

  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;

  const questionnaire: QuestionnairePostData = useSelector(selectQuestionnaire);
  const { type, questionWindows } = questionnaire;

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  const programmeCallback = (newProgrammes: number[]) => {
    setProgrammeIds(newProgrammes);
  };

  const questClassCallback = (newClasses: number[]) => {
    setClassIds(newClasses);
  };

  const handleSelectSingle = () => {
    dispatch(setType(QuestionnaireType.ONE_TIME));
    setIsTypeSelected(true);
  };

  const handleSelectPrePost = () => {
    dispatch(setType(QuestionnaireType.PRE_POST));
    setIsTypeSelected(true);
  };

  const clearQuestionnairePromise = (
    myDispatch: Dispatch<{ payload: undefined; type: string }>
  ) =>
    new Promise((resolve, _reject) => {
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
      {!isTypeSelected ? (
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
                className={classes.typeCard}
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
                className={classes.typeCard}
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
              postEndDateCallback={(date: Date) =>
                dispatch(setPostEndTime(date))
              }
            />
            <AssignAccordion
              user={user!}
              programmeIds={programmeIds}
              programmeCallback={programmeCallback}
              classIds={classIds}
              classCallback={questClassCallback}
            />
            <EditAccordion questionnaire={questionnaire} />
            <Grid container justify="flex-end">
              <QuestButton onClick={handleComplete} fullWidth>
                Finish
              </QuestButton>
            </Grid>
          </Paper>
        </div>
      )}
    </PageContainer>
  );
};

export default CreateQuestionnaire;
