import React, { useState, useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { isBefore, isAfter } from 'date-fns';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
import QuestionnaireCard from 'components/questionnaireCard';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import PageHeader from 'components/pageHeader';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';

import { questionnaires } from './mockData';
import { useStyles } from './questionnaires.styles';
import QuestionnaireTabs from './questionnaireTabs';

interface QuestionnairesState extends RouteState {
  questionnaires: QuestionnaireListData[];
}

const Questionnaires: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: QuestionnairesState, a: Partial<QuestionnairesState>) => ({
      ...s,
      ...a,
    }),
    {
      questionnaires,
      isLoading: true,
      isError: false,
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [tabValue, setTabValue] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('questionnaires');
        if (!didCancel) {
          setState({
            questionnaires: response.data.questionnaireListData,
            isLoading: false,
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isError: true, isLoading: false });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
  const tabs = ['Current', 'Upcoming', 'Past'];

  if (state.isLoading) {
    return (
      <PageContainer>
        <PageHeader
          breadcrumbs={breadcrumbs}
          action={
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={`${QUESTIONNAIRES}${CREATE}`}
            >
              Create New
            </Button>
          }
        />
        <QuestionnaireTabs
          value={tabValue}
          setValue={setTabValue}
          labels={tabs}
          buttonRight={
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Create New
            </Button>
          }
          buttonLeft={
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled
            >
              Manage Sample Questions
            </Button>
          }
        />
        <Grid container spacing={3}>
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
      </PageContainer>
    );
  }

  const now = new Date();
  let renderedQuestionnaires;
  switch (tabValue) {
    case 1:
      renderedQuestionnaires = state.questionnaires.filter((q) =>
        isAfter(q.startAt, now)
      );
      break;
    case 2:
      renderedQuestionnaires = state.questionnaires.filter((q) =>
        isBefore(q.endAt, now)
      );
      break;
    case 0:
    default:
      renderedQuestionnaires = state.questionnaires.filter(
        (q) => isBefore(q.startAt, now) && isAfter(q.endAt, now)
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
      <PageHeader breadcrumbs={breadcrumbs} />
      <QuestionnaireTabs
        value={tabValue}
        setValue={setTabValue}
        labels={tabs}
        buttonRight={
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={`${QUESTIONNAIRES}${CREATE}`}
          >
            Create Questionnaire
          </Button>
        }
        buttonLeft={
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled
          >
            Manage Sample Questions
          </Button>
        }
      />
      <Grid container spacing={6}>
        {renderedQuestionnaires.length > 0 &&
          renderedQuestionnaires.map((q) => {
            const menuOptions = getMenuOptions(q.id);
            return (
              <Grid item xs={12} sm={6} lg={4} key={q.name}>
                <QuestionnaireCard
                  questionnaire={q}
                  menuOptions={menuOptions}
                />
              </Grid>
            );
          })}
      </Grid>
    </PageContainer>
  );
};

export default Questionnaires;
