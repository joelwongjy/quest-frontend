import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { EDIT, QUESTIONNAIRES } from 'constants/routes';
import PageHeader from 'components/pageHeader';

import { questionnaires } from '../mockData';

interface RouteParams {
  id: string;
}

const EditQuestionnaire: React.FunctionComponent = () => {
  const { id } = useRouteMatch<RouteParams>({
    path: `${QUESTIONNAIRES}/:id${EDIT}`,
  })!.params;

  const questionnaire = questionnaires.filter(
    (q) => q.id === parseInt(id, 10)
  )[0];

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    {
      text: `Editing ${questionnaire.name}`,
      href: `${QUESTIONNAIRES}/${id}${EDIT}`,
    },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
    </PageContainer>
  );
};

export default EditQuestionnaire;
