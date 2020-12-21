import React from 'react';
import { Grid } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import { QUESTS } from 'constants/routes';
import QuestionnaireTabs from 'components/questionnaireTabs';
import { CardMode } from 'interfaces/components/questionnaireCard';

import { useStyles } from './quests.styles';

const QuestsGhost: React.FC = () => {
  const classes = useStyles();
  const breadcrumbs = [{ text: 'Quests', href: QUESTS }];
  const tabs = ['New', 'Completed'];
  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid container className={classes.main}>
        <QuestionnaireTabs
          value={0}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          setValue={() => {}}
          labels={tabs}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} lg={4}>
            <QuestionnaireCardGhost mode={CardMode.STUDENT} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <QuestionnaireCardGhost mode={CardMode.STUDENT} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <QuestionnaireCardGhost mode={CardMode.STUDENT} />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default QuestsGhost;
