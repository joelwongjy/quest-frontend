import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { QUESTIONNAIRES, RESPONSES } from 'constants/routes';
import PageHeader from 'components/pageHeader';

import { questionnaires } from '../mockData';

interface RouteParams {
  id: string;
}

const Responses: React.FunctionComponent = () => {
  const { id } = useRouteMatch<RouteParams>({
    path: `${QUESTIONNAIRES}/:id${RESPONSES}`,
  })!.params;

  const questionnaire = questionnaires.filter(
    (q) => q.id === parseInt(id, 10)
  )[0];

  const breadcrumbs = [
    { text: 'Questionnaires', href: QUESTIONNAIRES },
    {
      text: `Viewing Responses for ${questionnaire.name}`,
      href: `${QUESTIONNAIRES}/${id}${RESPONSES}`,
    },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
    </PageContainer>
  );
};

export default Responses;
