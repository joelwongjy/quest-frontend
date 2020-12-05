/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

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
} from 'reducers/questionnaireDux';

import DateAccordion from '../dateAccordion';
import AssignAccordion from '../assignAccordion';
import EditAccordion from '../editAccordion';
import { useStyles } from './createQuestionnaire.styles';

const CreateQuestionnaire: React.FunctionComponent = () => {
  const user = useUser();
  const classes = useStyles();
  const [programmeIds, setProgrammeIds] = useState<number[]>([]);
  const [classIds, setClassIds] = useState<number[]>([]);

  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;

  const questionnaire = useSelector(selectQuestionnaire);
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
                ? new Date(questionWindows[1].startAt)
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
          <EditAccordion questionnaire={questionnaire} />
          <Grid container justify="flex-end">
            <QuestButton fullWidth>Finish</QuestButton>
          </Grid>
        </Paper>
      </div>
    </PageContainer>
  );
};

export default CreateQuestionnaire;
