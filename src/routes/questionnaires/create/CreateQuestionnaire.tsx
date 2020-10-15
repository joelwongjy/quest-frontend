/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import nextId from 'react-id-generator';
import { useSelector, useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import Accordion from 'components/accordion';
import QuestionCard from 'components/questionCard';
import ShortButton from 'components/shortButton';
import LongButton from 'components/longButton';
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

const CreateQuestionnaire: React.FunctionComponent = () => {
  const user = useUser();
  const [programmeId, setProgrammeId] = useState<number>(1);
  const [classId, setClassId] = useState<number>(1);

  const dispatch = useDispatch();
  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;

  const questionnaire = useSelector(selectQuestionnaire);
  const { type, questionWindows } = questionnaire;

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create New', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  const programmeCallback = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProgrammeId(event.target.value as number);
  };

  const questClassCallback = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClassId(event.target.value as number);
  };

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Paper elevation={0} style={{ background: 'white' }}>
        <DateAccordion
          type={type}
          preStartDate={questionWindows[0].startAt}
          preStartDateCallback={(date: Date) => dispatch(setPreStartTime(date))}
          preEndDate={questionWindows[0].endAt}
          preEndDateCallback={(date: Date) => dispatch(setPreEndTime(date))}
          postStartDate={
            questionWindows.length > 1 ? questionWindows[1].startAt : undefined
          }
          postStartDateCallback={(date: Date) =>
            dispatch(setPostStartTime(date))
          }
          postEndDate={
            questionWindows.length > 1 ? questionWindows[1].startAt : undefined
          }
          postEndDateCallback={(date: Date) => dispatch(setPostEndTime(date))}
        />
        <AssignAccordion
          user={user!}
          programmeId={programmeId}
          programmeCallback={programmeCallback}
          classId={classId}
          classCallback={questClassCallback}
        />
        {/* <Accordion heading="Step 3: Create the shared questions">
          <Grid container spacing={3}>
            <Grid item xs={12} alignItems="flex-end">
              <ShortButton
                onClick={() => {
                  const createdSharedQuestionsCopy = createdSharedQuestions.slice();
                  createdSharedQuestionsCopy.push({
                    id: nextId(),
                    questionText: '',
                    questionType: 'MCQ',
                    options: [],
                  });
                  setCreatedSharedQuestions(createdSharedQuestionsCopy);
                }}
              >
                New Question
              </ShortButton>
            </Grid>
            {createdSharedQuestions.map((q: Question, index: number) => {
              return (
                <Grid item xs={12} key={q.id}>
                  <QuestionCard
                    question={q}
                    questionIndex={index + 1}
                    mode="new"
                    handleDelete={() => {
                      let createdSharedQuestionsCopy = createdSharedQuestions.slice();
                      createdSharedQuestionsCopy = createdSharedQuestionsCopy.filter(
                        (question) => question.id !== q.id
                      );
                      setCreatedSharedQuestions(createdSharedQuestionsCopy);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Accordion> */}

        <Grid container justify="flex-end">
          <LongButton>Finish</LongButton>
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default CreateQuestionnaire;
