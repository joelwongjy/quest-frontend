import React, { useEffect, useReducer, useState } from 'react';
import { Grid } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import { QUESTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import QuestionnaireTabs from 'components/questionnaireTabs';
import { RouteState } from 'interfaces/routes/common';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';
import ApiService from 'services/apiService';
import { convertDateOfQuestionnaires } from 'utils/questionnaireUtils';
import { AttemptListData } from 'interfaces/models/attempts';
import { useUser } from 'contexts/UserContext';
import { getCompletedQuests, getNewQuests } from 'utils/questUtils';
import QuestionnaireCard from 'components/questionnaireCard';
import { CardMode } from 'interfaces/components/questionnaireCard';

import { useStyles } from './quests.styles';
import QuestsGhost from './QuestsGhost';

interface QuestState extends RouteState {
  quests: QuestionnaireListData[];
  attempts: AttemptListData[];
}

const Quests: React.FC = () => {
  const breadcrumbs = [{ text: 'Quests', href: QUESTS }];
  const classes = useStyles();
  const { user } = useUser();
  const [tabValue, setTabValue] = useState<number>(0);
  const tabs = ['New', 'Completed'];
  const [state, setState] = useReducer(
    (s: QuestState, a: Partial<QuestState>) => ({
      ...s,
      ...a,
    }),
    {
      quests: [],
      attempts: [],
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
      hasConfirm: false,
      closeHandler: () => {
        setState({ isAlertOpen: false });
      },
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const questResponse = await ApiService.get('questionnaires');
        const quests = convertDateOfQuestionnaires(
          questResponse.data.questionnaires as QuestionnaireListData[]
        );

        const attemptResponse = await ApiService.get(
          'questionnaires/submissions'
        );
        if (!didCancel) {
          setState({
            quests,
            attempts: attemptResponse.data as AttemptListData[],
            isLoading: false,
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isError: true,
            isLoading: false,
            isAlertOpen: true,
            alertHeader: 'Something went wrong',
            alertMessage: 'Please refresh the page and try again',
          });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, []);

  if (state.isLoading) {
    return <QuestsGhost />;
  }

  if (state.isError) {
    return <></>; // TODO: Add error handling
  }

  const newQuests = getNewQuests(
    state.quests,
    state.attempts,
    user!.programmes
  );
  const completedQuests = getCompletedQuests(
    state.quests,
    state.attempts,
    user!.programmes
  );

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid container className={classes.main}>
        <QuestionnaireTabs
          value={tabValue}
          setValue={setTabValue}
          labels={tabs}
        />
        <Grid container spacing={6}>
          {tabValue === 0 &&
            newQuests.map((q) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={`${q.quest.type}-${q.quest.name}-${q.quest.id}`}
                >
                  <QuestionnaireCard
                    questionnaire={q.quest}
                    mode={CardMode.STUDENT}
                    programmeName={q.programme}
                  />
                </Grid>
              );
            })}
          {tabValue === 1 &&
            completedQuests.map((q) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={`${q.quest.type}-${q.quest.name}-${q.quest.id}`}
                >
                  <QuestionnaireCard
                    questionnaire={q.quest}
                    mode={CardMode.STUDENT}
                    programmeName={q.programme}
                    isAttempted
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Quests;
