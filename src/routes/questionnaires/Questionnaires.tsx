import React, { useState, useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { isBefore, isAfter } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
import QuestionnaireCard from 'components/questionnaireCard';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import PageHeader from 'components/pageHeader';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';
import QuestButton from 'componentWrappers/questButton';

import QuestAlert from 'componentWrappers/questAlert';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import { RootState } from 'reducers/rootReducer';
import {
  clearQuestionnaire,
  QuestionnaireDux,
} from 'reducers/questionnaireDux';
import QuestBanner from 'componentWrappers/questBanner';
import { questionnaires } from './mockData';
import { useStyles } from './questionnaires.styles';
import QuestionnaireTabs from './questionnaireTabs';

export interface QuestionnairesState extends RouteState {
  questionnaires: QuestionnaireListData[];
  hasConfirm: boolean;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
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
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
      hasConfirm: false,
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnairePostData = useSelector(selectQuestionnaire);
  const { questionWindows, sharedQuestions } = questionnaire;
  const [tabValue, setTabValue] = useState<number>(0);
  const [
    hasIncompleteQuestionnaire,
    setHasIncompleteQuestionnare,
  ] = useState<boolean>(
    (questionWindows[0] && questionWindows[0].questions.length !== 0) ||
      (questionWindows[1] && questionWindows[1].questions.length !== 0) ||
      (sharedQuestions && sharedQuestions.questions.length !== 0)
  );
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('questionnaires');
        const questionnaires = (response.data
          .questionnaires as QuestionnaireListData[]).map(
          (q: QuestionnaireListData) => ({
            ...q,
            createdAt: new Date(q.createdAt),
            startAt: new Date(q.startAt),
            endAt: new Date(q.endAt),
            updatedAt: new Date(q.updatedAt),
          })
        );
        if (!didCancel) {
          setState({
            questionnaires,
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
        <PageHeader breadcrumbs={breadcrumbs} />
        <QuestionnaireTabs
          value={tabValue}
          setValue={setTabValue}
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
      {hasIncompleteQuestionnaire && (
        <QuestBanner
          severity="warning"
          hasAction
          action={() => {
            history.push(`${QUESTIONNAIRES}${CREATE}`);
          }}
          actionMessage="Continue"
          alertMessage="You have an incomplete questionnaire"
        />
      )}
      <PageHeader breadcrumbs={breadcrumbs} />
      <QuestionnaireTabs
        value={tabValue}
        setValue={setTabValue}
        labels={tabs}
        buttonRight={
          // Cannot use QuestButton because of the `component` attribute
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => {
              if (hasIncompleteQuestionnaire) {
                setState({
                  isAlertOpen: true,
                  alertHeader: 'You have an incomplete questionnaire',
                  alertMessage:
                    'Are you sure you would like to start a new questionnaire?',
                  hasConfirm: true,
                  confirmHandler: () => {
                    setHasIncompleteQuestionnare(false);
                    dispatch(clearQuestionnaire());
                    history.push(`${QUESTIONNAIRES}${CREATE}`);
                  },
                });
              } else {
                history.push(`${QUESTIONNAIRES}${CREATE}`);
              }
            }}
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
        {renderedQuestionnaires.length > 0 &&
          renderedQuestionnaires.map((q) => {
            const menuOptions = getMenuOptions(q.id);
            return (
              <Grid item xs={12} sm={6} lg={4} key={`${q.name}-${q.id}`}>
                <QuestionnaireCard
                  questionnaire={q}
                  menuOptions={menuOptions}
                />
              </Grid>
            );
          })}
      </Grid>
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.confirmHandler}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Questionnaires;
