import React from 'react';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import McqQuestion from 'components/mcqQuestion/view/McqQuestion';
import EditMcqQuestion from 'components/mcqQuestion/edit/McqQuestion';
import ShortAnswerQuestion from 'components/shortAnswerQuestion/view/ShortAnswerQuestion';
import EditShortAnswerQuestion from 'components/shortAnswerQuestion/edit/ShortAnswerQuestion';
import LongAnswerQuestion from 'components/longAnswerQuestion/view/LongAnswerQuestion';
import EditLongAnswerQuestion from 'components/longAnswerQuestion/edit/LongAnswerQuestion';
import MoodQuestion from 'components/moodQuestion/view/MoodQuestion';
import EditMoodQuestion from 'components/moodQuestion/edit/MoodQuestion';

const CreateQuestionnaire: React.FunctionComponent = () => {
  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create New', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
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
