import React from 'react';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';

const CreateQuestionnaire: React.FunctionComponent = () => {
  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create New', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
    </PageContainer>
  );
};

export default CreateQuestionnaire;
