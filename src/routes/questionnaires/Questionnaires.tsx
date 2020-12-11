import React, { useState, useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { isBefore, isAfter } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, DUPLICATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
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
  setMode,
} from 'reducers/questionnaireDux';
import QuestBanner from 'componentWrappers/questBanner';
import { isEmptyQuestionnaire } from 'utils/questionnaireUtils';
import { questionnaires } from './mockData';
import { useStyles } from './questionnaires.styles';
import QuestionnaireTabs from './questionnaireTabs';

export interface QuestionnairesState extends RouteState {
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
  const dispatch = useDispatch();
  const history = useHistory();

  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnairePostData = useSelector(selectQuestionnaire);
  const [tabValue, setTabValue] = useState<number>(0);
  const [
    hasIncompleteQuestionnaire,
    setHasIncompleteQuestionnare,
  ] = useState<boolean>(!isEmptyQuestionnaire(questionnaire));

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
  }, [dispatch]);

  const breadcrumbs = [{ text: 'Questionnaires', href: QUESTIONNAIRES }];
  const tabs = ['Current', 'Upcoming', 'Past'];

  if (state.isLoading) {
    return (
      <PageContainer>
        <PageHeader breadcrumbs={breadcrumbs} />
        <Grid container style={{ marginLeft: '1rem' }}>
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
        callback:
          hasIncompleteQuestionnaire && id !== questionnaire.questionnaireId
            ? () =>
                setState({
                  isAlertOpen: true,
                  hasConfirm: true,
                  alertHeader: 'Are you sure?',
                  alertMessage:
                    'You have an unsaved questionnaire, your changes will be discarded if you edit a different questionnaire',
                  confirmHandler: () => {
                    dispatch(setMode('EDIT'));
                    history.push(`${QUESTIONNAIRES}/${id}${EDIT}`);
                  },
                })
            : () => {
                dispatch(setMode('EDIT'));
                history.push(`${QUESTIONNAIRES}/${id}${EDIT}`);
              },
      },
      {
        text: 'Make a copy',
        callback: hasIncompleteQuestionnaire
          ? () =>
              setState({
                isAlertOpen: true,
                hasConfirm: true,
                alertHeader: 'Are you sure?',
                alertMessage:
                  'You have an unsaved questionnaire, your changes will be discarded if you start a new questionnaire',
                confirmHandler: () => {
                  dispatch(setMode('DUPLICATE'));
                  history.push(`${QUESTIONNAIRES}/${id}${DUPLICATE}`);
                },
              })
          : () => {
              dispatch(setMode('DUPLICATE'));
              history.push(`${QUESTIONNAIRES}/${id}${DUPLICATE}`);
            },
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
            switch (questionnaire.mode) {
              case 'EDIT':
                history.push(
                  `${QUESTIONNAIRES}/${questionnaire.questionWindows}${EDIT}`
                );
                break;
              case 'DUPLICATE':
                history.push(
                  `${QUESTIONNAIRES}/${questionnaire.questionnaireId}${DUPLICATE}`
                );
                break;
              case 'CREATE':
              default:
                history.push(`${QUESTIONNAIRES}${CREATE}`);
            }
          }}
          actionMessage="Continue"
          alertMessage="You have an incomplete questionnaire"
        />
      )}
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid container style={{ marginLeft: '1rem' }}>
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
      </Grid>
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Questionnaires;
