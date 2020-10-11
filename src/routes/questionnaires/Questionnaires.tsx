import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import Breadcrumbs from 'components/breadcrumbs';
import { QUESTIONNAIRES } from 'constants/routes';
import PaperTabs from 'components/paperTabs';
import Card from 'components/card';

const Questionnaires: React.FunctionComponent = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
  const tabs = ['Active', 'Upcoming', 'Past'];

  return (
    <PageContainer>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PaperTabs value={tabValue} setValue={setTabValue} labels={tabs} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>Test</Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>Test</Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>Test</Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>Test</Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>Test</Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Questionnaires;
