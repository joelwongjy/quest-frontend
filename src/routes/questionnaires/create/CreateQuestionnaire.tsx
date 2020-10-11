import React from 'react';

import PageContainer from 'components/pageContainer';
import { CREATE, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import Accordion from 'components/accordion';

const CreateQuestionnaire: React.FunctionComponent = () => {
  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    { text: 'Create New', href: `${QUESTIONNAIRES}/${CREATE}` },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Accordion heading="Step 1: Set the duration">TestTestTest</Accordion>
      <Accordion heading="Step 2: Assign the questionnaire">
        TestTestTest
      </Accordion>
    </PageContainer>
  );
};

export default CreateQuestionnaire;
