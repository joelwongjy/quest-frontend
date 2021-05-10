import React, { useState, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';

import PageContainer from 'components/pageContainer';
import {
  CLASSES,
  CREATE,
  DUPLICATE,
  EDIT,
  PROGRAMMES,
  QUESTIONNAIRES,
  STUDENTS,
} from 'constants/routes';
import QuestionnaireCard from 'components/questionnaireCard';
import PageHeader from 'components/pageHeader';
import { MenuOption } from 'interfaces/components/questionnaireCard';
import { ClassRouteParams } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';
import { ProgrammeData } from 'interfaces/models/programmes';

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
import QuestionnaireTabs from 'components/questionnaireTabs';

import ProgrammeClassPicker from 'components/programmeClassPicker';
import { useUser } from 'contexts/UserContext';
import {
  getQuestionnairesToRender,
  tabs,
  QuestionnairesState,
  getMenuOptions,
} from './helpers';
import { useStyles } from './questionnaires.styles';
import QuestionnairesGhost from './QuestionnairesGhost';

const Questionnaires: React.FunctionComponent = () => {
  const { user } = useUser();
  const [tabValue, setTabValue] = useState<number>(0);
  const [state, setState] = useReducer(
    (s: QuestionnairesState, a: Partial<QuestionnairesState>) => ({
      ...s,
      ...a,
    }),
    {
      questionnaires: [],
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
  const { id, classId } = useParams<ClassRouteParams>();
  const dispatch = useDispatch();
  const history = useHistory();

  const selectQuestionnaire = (state: RootState): QuestionnaireDux =>
    state.questionnaire;
  const questionnaire: QuestionnaireDux = useSelector(selectQuestionnaire);
  const [
    hasIncompleteQuestionnaire,
    setHasIncompleteQuestionnare,
  ] = useState<boolean>(!isEmptyQuestionnaire(questionnaire));
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [programme, setProgramme] = useState<{ id: number; name: string }>();
  const [selectedProgrammes, setSelectedProgrammes] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedClasses, setSelectedClasses] = useState<
    { id: number; name: string }[]
  >([]);

  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('questionnaires');
        const questionnaires = convertDateOfQuestionnaires(
          response.data.questionnaires as QuestionnaireListData[]
        );
        if (id) {
          const programmeResponse = await ApiService.get(`programmes/${id}`);
          const programme = programmeResponse.data as ProgrammeData;
          if (!didCancel) {
            if (!classId) {
              setSelectedProgrammes([{ id: Number(id), name: programme.name }]);
            }
            setProgramme({ id: Number(id), name: programme.name });
            const questClasses = classId
              ? programme.classes
                  .filter((c) => c.id === Number(classId))
                  .map((c) => {
                    return { id: c.id, name: c.name };
                  })
              : programme.classes.map((c) => {
                  return { id: c.id, name: c.name };
                });
            setSelectedClasses(questClasses);
          }
        }
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
  }, []);

  const breadcrumbs = id
    ? [
        { text: 'Programmes', href: `${PROGRAMMES}` },
        {
          text:
            state.isLoading || programme == null ? 'Loading' : programme.name,
          href: `${PROGRAMMES}/${id}${CLASSES}`,
        },
        ...(classId
          ? [
              {
                text: 'Classes',
                href: `${PROGRAMMES}/${id}${CLASSES}`,
              },
              {
                text:
                  state.isLoading || selectedClasses[0] == null
                    ? 'Loading'
                    : selectedClasses[0].name,
                href: `${PROGRAMMES}/${id}${CLASSES}/${classId}${STUDENTS}`,
              },
            ]
          : []),
        {
          text: 'Questionnaires',
          href: `${PROGRAMMES}/${id}${QUESTIONNAIRES}`,
        },
      ]
    : [{ text: 'Questionnaires', href: QUESTIONNAIRES }];

  if (state.isLoading) {
    return <QuestionnairesGhost />;
  }

  const renderedQuestionnaires = getQuestionnairesToRender(
    state.questionnaires,
    tabValue,
    selectedProgrammes,
    selectedClasses
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
        alertHeader: 'Waning',
        alertMessage:
          'You have an incomplete questionnaire. By creating a new questionnaire, ' +
          'the previous incomplete questionnaire will be discarded. ' +
          'Are you sure you want to create a new questionnaire?',
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

  const programmeCallback = (newProgrammes: { id: number; name: string }[]) => {
    setSelectedProgrammes(newProgrammes);
  };

  const classCallback = (newClasses: { id: number; name: string }[]) => {
    setSelectedClasses(newClasses);
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
            {/* <QuestButton
              variant="contained"
              color="secondary"
              className={classes.button}
              style={{ marginRight: '0.75rem' }}
              disabled
            >
              Manage Sample Questions
            </QuestButton> */}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleCreate}
            >
              Create
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
      <Fab
        color="secondary"
        aria-label="edit"
        className={classes.fab}
        onClick={() => setIsFilterOpen(true)}
      >
        <FilterIcon />
      </Fab>
      <Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <DialogTitle id="filter-dialog-title">
          Filter Questionnaires
        </DialogTitle>
        <DialogContent>
          <ProgrammeClassPicker
            programmes={user!.programmes}
            selectedClasses={selectedClasses}
            selectedProgrammes={selectedProgrammes}
            programmeCallback={programmeCallback}
            classCallback={classCallback}
          />
        </DialogContent>
      </Dialog>
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
