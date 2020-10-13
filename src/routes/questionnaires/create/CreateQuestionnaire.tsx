import React, { useState } from 'react';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import McqQuestion from 'components/mcqQuestion/view/ViewMcqQuestion';
import EditMcqQuestion from 'components/mcqQuestion/edit';
import ShortAnswerQuestion from 'components/shortAnswerQuestion/view/ShortAnswerQuestion';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit/ShortAnswerQuestion';
import LongAnswerQuestion from 'components/longAnswerQuestion/view/LongAnswerQuestion';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit/LongAnswerQuestion';
import MoodQuestion from 'components/moodQuestion/view/MoodQuestion';
import EditMoodQuestion from 'components/moodQuestion/edit/MoodQuestion';
import Accordion from 'components/accordion';
import QuestDatePicker from 'components/questDatePicker';
import QuestProgram, { QuestClass } from 'interfaces/models/admin';
import ProgramClassPicker from 'components/programClassPicker';
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
      <McqQuestion question="test" options={['test', '23223']} />
      <EditMcqQuestion />
      <ShortAnswerQuestion question="How many mods do I need to SU" />
      <EditShortAnswerQuestion />
      <LongAnswerQuestion question="Will I tank the bell curve?" />
      <EditLongAnswerQuestion />
      <MoodQuestion question="testing123?" />
      <EditMoodQuestion />
    </PageContainer>
  );
};

export default CreateQuestionnaire;
