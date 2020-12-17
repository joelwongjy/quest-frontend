import React, { useState, useEffect, useReducer } from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, DUPLICATE, EDIT, QUESTIONNAIRES } from 'constants/routes';
import QuestionnaireCard from 'components/questionnaireCard';
import PageHeader from 'components/pageHeader';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import ApiService from 'services/apiService';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';
import QuestButton from 'componentWrappers/questButton';

import QuestAlert from 'componentWrappers/questAlert';
import { RootState } from 'reducers/rootReducer';
import {
  clearQuestionnaire,
  QuestionnaireDux,
} from 'reducers/questionnaireDux';
import QuestBanner from 'componentWrappers/questBanner';
import {
  isEmptyQuestionnaire,
  convertDateOfQuestionnaires,
} from 'utils/questionnaireUtils';

import { questionnaires } from './mockData';
import {
  getQuestionnairesToRender,
  breadcrumbs,
  tabs,
  QuestionnairesState,
  getMenuOptions,
} from './helpers';
import { useStyles } from './questionnaires.styles';
import QuestionnaireTabs from './questionnaireTabs';
import QuestionnairesGhost from './QuestionnairesGhost';

const Questionnaires: React.FunctionComponent = () => {
  const [tabValue, setTabValue] = useState<number>(0);
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
  const questionnaire: QuestionnaireDux = useSelector(selectQuestionnaire);
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
        const questionnaires = convertDateOfQuestionnaires(
          response.data.questionnaires as QuestionnaireListData[]
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

  if (state.isLoading) {
    return <QuestionnairesGhost />;
  }

  const renderedQuestionnaires = getQuestionnairesToRender(
    state.questionnaires,
    tabValue
  );

  const getOptions = (id: number): MenuOption[] => {
    return getMenuOptions(
      id,
      questionnaire,
      setState,
      hasIncompleteQuestionnaire,
      history
    );
  };

  const renderBannerMessage = () => {
    switch (questionnaire.mode) {
      case 'EDIT':
        return `You are currently editing: ${questionnaire.title}`;
      case 'CREATE':
      default:
        if (questionnaire.title?.length > 0) {
          return `You have an unsaved new questionnaire: ${questionnaire.title}`;
        }
        return 'You have an unsaved new questionnaire';
    }
  };

  const handleContinue = (): void => {
    switch (questionnaire.mode) {
      case 'EDIT':
        history.push(
          `${QUESTIONNAIRES}/${questionnaire.questionnaireId}${EDIT}`
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
  };

  const handleCreate = (): void => {
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
  };

  return (
    <PageContainer>
      {hasIncompleteQuestionnaire && (
        <QuestBanner
          severity="warning"
          hasAction
          action={handleContinue}
          actionMessage="Continue"
          alertMessage={renderBannerMessage()}
        />
      )}
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          <ButtonGroup className={classes.buttonGroup}>
            <QuestButton
              variant="contained"
              color="secondary"
              className={classes.button}
              style={{ marginRight: '0.75rem' }}
              disabled
            >
              Manage Sample Questions
            </QuestButton>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleCreate}
            >
              Create Questionnaire
            </Button>
          </ButtonGroup>
        }
      />
      <Grid container className={classes.main}>
        <QuestionnaireTabs
          value={tabValue}
          setValue={setTabValue}
          labels={tabs}
        />
        <Grid container spacing={6}>
          {renderedQuestionnaires.length > 0 &&
            renderedQuestionnaires.map((q) => {
              const menuOptions = getOptions(q.id);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={`${q.type}-${q.name}-${q.id}`}
                >
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
