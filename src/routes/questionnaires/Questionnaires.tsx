import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { isBefore, isAfter } from 'date-fns';
import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { CREATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
import PaperTabs from 'components/paperTabs';
import QuestionnaireCard from 'components/questionnaireCard';
import PageHeader from 'components/pageHeader';
import ShortButton from 'components/shortButton';
import { MenuOption } from 'interfaces/components/questionnaireCard';

import { questionnaires } from './mockData';

const Questionnaires: React.FunctionComponent = () => {
  const history = useHistory();
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

  const getMenuOptions = (id: number): MenuOption[] => {
    return [
      {
        text: 'Edit',
        callback: () => history.push(`${QUESTIONNAIRES}/${id}${EDIT}`),
      },
      {
        text: 'Make a copy',
        // eslint-disable-next-line no-console
        callback: () => console.log('TODO: Make a copy'),
      },
    ];
  };

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          <ShortButton href={`${QUESTIONNAIRES}${CREATE}`}>
            Create New
          </ShortButton>
        }
      />
      <PaperTabs value={tabValue} setValue={setTabValue} labels={tabs} />
      <Grid container spacing={3}>
        {renderedQuestionnaires.map((q) => {
          const menuOptions = getMenuOptions(q.id);
          return (
            <Grid item xs={12} sm={6} lg={4} key={q.name}>
              <QuestionnaireCard questionnaire={q} menuOptions={menuOptions} />
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
};

export default Questionnaires;
