import React, { useState } from 'react';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import EditMcqQuestion from 'components/mcqQuestion/edit';
import ShortAnswerQuestion from 'components/shortAnswerQuestion/view/ViewShortAnswerQuestion';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit/EditShortAnswerQuestion';
import LongAnswerQuestion from 'components/longAnswerQuestion/view/ViewLongAnswerQuestion';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit/EditLongAnswerQuestion';
import MoodQuestion from 'components/moodQuestion/view/ViewMoodQuestion';
import EditMoodQuestion from 'components/moodQuestion/edit/EditMoodQuestion';
import Accordion from 'components/accordion';
import QuestDatePicker from 'components/questDatePicker';
import QuestProgram, { QuestClass, Question } from 'interfaces/models/admin';
import ProgramClassPicker from 'components/programClassPicker';
import { Button, Grid, Paper } from '@material-ui/core';
import QuestionCard from 'components/questionCard';
import ShortButton from 'components/shortButton';
import { programs } from '../mockData';

const CreateQuestionnaire: React.FunctionComponent = () => {
  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create New', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [questPrograms, setQuestProgrames] = useState<QuestProgram[]>(programs);
  const [questClasses, setQuestClasses] = useState<QuestClass[]>([]);
  const [questProgramId, setQuestProgramId] = useState<number>(1);
  const [questClassId, setQuestClassId] = useState<number>(1);
  const [createdSharedQuestions, setCreatedSharedQuestions] = useState<
    Question[]
  >([]);
  const [createdSpecialQuestions, setCreatedSpecialQuestions] = useState<
    Question[]
  >([]);
  const [newQuestion, setNewQuestion] = useState<Question | null>(null);

  const startDateCallback = (start: Date) => {
    setStartDate(start);
  };

  const endDateCallback = (end: Date) => {
    setEndDate(end);
  };

  const programCallback = (event: React.ChangeEvent<{ value: unknown }>) => {
    setQuestProgramId(event.target.value as number);
  };

  const questClassCallback = (event: React.ChangeEvent<{ value: unknown }>) => {
    setQuestClassId(event.target.value as number);
  };

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Paper elevation={0} style={{ background: 'white' }}>
        <Accordion heading="Step 1: Set the duration">
          <QuestDatePicker
            startDate={startDate}
            endDate={endDate}
            startDateCallback={startDateCallback}
            endDateCallback={endDateCallback}
          />
        </Accordion>
        <Accordion heading="Step 2: Assign the questionnaire">
          <ProgramClassPicker
            programs={questPrograms}
            selectedQuestProgramId={questProgramId}
            selectedQuestClassId={questClassId}
            programCallback={programCallback}
            questClassCallback={questClassCallback}
          />
        </Accordion>
        <Accordion heading="Step 3: Create the shared questions">
          <Grid container spacing={3}>
            <Grid item xs={12} alignItems="flex-end">
              <ShortButton
                onClick={() => {
                  const createdSharedQuestionsCopy = createdSharedQuestions.slice();
                  createdSharedQuestionsCopy.push({
                    id: createdSharedQuestions.length + 1,
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
            {createdSharedQuestions.map((q: Question) => {
              return (
                <Grid item xs={12} key={q.id}>
                  <QuestionCard question={q} questionIndex={q.id} mode="new" />
                </Grid>
              );
            })}
          </Grid>
        </Accordion>
        <Accordion heading="Step 4: Create the special questions">
          <Grid container spacing={3}>
            <Grid item xs={12} alignItems="flex-end">
              <ShortButton
                onClick={() => {
                  const createdSpecialQuestionsCopy = createdSpecialQuestions.slice();
                  createdSpecialQuestionsCopy.push({
                    id:
                      createdSharedQuestions.length +
                      createdSpecialQuestions.length +
                      1,
                    questionText: '',
                    questionType: 'MCQ',
                    options: [],
                  });
                  setCreatedSpecialQuestions(createdSpecialQuestionsCopy);
                }}
              >
                New Question
              </ShortButton>
            </Grid>
            {createdSpecialQuestions.map((q: Question) => {
              return (
                <Grid item xs={12} key={q.id}>
                  <QuestionCard question={q} questionIndex={q.id} mode="new" />
                </Grid>
              );
            })}
          </Grid>
        </Accordion>
      </Paper>
    </PageContainer>
  );
};

export default CreateQuestionnaire;
