import React from 'react';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import McqQuestion from 'components/questions/mcqQuestion/view/McqQuestion';
import EditMcqQuestion from 'components/questions/mcqQuestion/edit/McqQuestion';
import ShortAnswerQuestion from 'components/questions/shortAnswerQuestion/view/ShortAnswerQuestion';

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
      <ShortAnswerQuestion />
    </PageContainer>
  );
};

export default CreateQuestionnaire;
