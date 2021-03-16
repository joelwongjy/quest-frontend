import React from 'react';
import { Button, Grid } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import QuestButton from 'componentWrappers/questButton';
import QuestionnaireTabs from 'components/questionnaireTabs';

import { breadcrumbs, tabs } from './helpers';
import { useStyles } from './questionnaires.styles';

const QuestionnairesGhost: React.FC = () => {
  const classes = useStyles();
  return (
    <PageContainer isLoggedIn>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid container className={classes.main}>
        <QuestionnaireTabs
          value={0}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          setValue={() => {}}
          labels={tabs}
          buttonRight={
            // Cannot use QuestButton because of the `component` attribute later
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled
            >
              Create Questionnaire
            </Button>
          }
          buttonLeft={
            <QuestButton
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled
            >
              Manage Sample Questions
            </QuestButton>
          }
        />
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} lg={4}>
            <QuestionnaireCardGhost />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <QuestionnaireCardGhost />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <QuestionnaireCardGhost />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default QuestionnairesGhost;
