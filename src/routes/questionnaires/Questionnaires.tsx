import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import Breadcrumbs from 'components/breadcrumbs';
import { QUESTIONNAIRES } from 'constants/routes';
import PaperTabs from 'components/paperTabs';
import QuestionnaireCard from 'components/questionnaireCard';

import { questionnaires } from './mockData';

const Questionnaires: React.FunctionComponent = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
  const tabs = ['Active', 'Upcoming', 'Past'];

  return (
    <PageContainer>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PaperTabs value={tabValue} setValue={setTabValue} labels={tabs} />
      <Grid container spacing={3}>
        {questionnaires.map((q) => (
          <Grid item xs={12} sm={6} lg={4} key={q.name}>
            <QuestionnaireCard questionnaire={q} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Questionnaires;
