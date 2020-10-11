import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { isBefore, isAfter } from 'date-fns';

import PageContainer from 'components/pageContainer';
import Breadcrumbs from 'components/breadcrumbs';
import { QUESTIONNAIRES } from 'constants/routes';
import PaperTabs from 'components/paperTabs';
import QuestionnaireCard from 'components/questionnaireCard';

import { questionnaires } from './mockData';

const Questionnaires: React.FunctionComponent = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
  const tabs = ['Current', 'Upcoming', 'Past'];

  const now = new Date();
  let renderedQuestionnaires;
  switch (tabValue) {
    case 1:
      renderedQuestionnaires = questionnaires.filter((q) =>
        isAfter(q.startDate, now)
      );
      break;
    case 2:
      renderedQuestionnaires = questionnaires.filter((q) =>
        isBefore(q.endDate, now)
      );
      break;
    case 0:
    default:
      renderedQuestionnaires = questionnaires.filter(
        (q) => isBefore(q.startDate, now) && isAfter(q.endDate, now)
      );
      break;
  }

  return (
    <PageContainer>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PaperTabs value={tabValue} setValue={setTabValue} labels={tabs} />
      <Grid container spacing={3}>
        {renderedQuestionnaires.map((q) => (
          <Grid item xs={12} sm={6} lg={4} key={q.name}>
            <QuestionnaireCard questionnaire={q} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Questionnaires;
