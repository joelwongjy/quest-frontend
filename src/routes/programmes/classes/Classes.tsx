import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';

import ApiService from 'services/apiService';
import { MenuOption } from 'interfaces/components/programmeCard';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import { ClassListData } from 'interfaces/models/classes';
import { ClassMode } from 'interfaces/components/classForm';
import ClassCard from 'components/classCard';
import ClassForm from 'components/classForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import { PROGRAMMES, CREATE, CLASSES } from 'constants/routes';
import QuestAlert from 'componentWrappers/questAlert';
import { getAlertCallback } from 'utils/alertUtils';
import { ProgrammeData } from 'interfaces/models/programmes';

import { sampleProgramme } from '../mockData';
import { useStyles } from './classes.styles';

interface ClassesState extends RouteState {
  programme: ProgrammeData;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedClass: ClassListData | undefined;
}

const Classes: React.FunctionComponent = () => {
  const { id } = useParams<RouteParams>();
  const [state, setState] = useReducer(
    (s: ClassesState, a: Partial<ClassesState>) => ({
      ...s,
      ...a,
    }),
    {
      programme: sampleProgramme,
      isAlertOpen: false,
      isLoading: true,
      isError: false,
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
      isEditing: false,
      selectedClass: undefined,
    }
  );

  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${PROGRAMMES}/${id}`);
        if (!didCancel) {
          setState({
            programme: response.data as ProgrammeData,
            isLoading: false,
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isError: true,
            isLoading: false,
            isAlertOpen: true,
            hasConfirm: false,
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

  const breadcrumbs = [
    { text: 'Programmes', href: `${PROGRAMMES}` },
    {
      text: state.isLoading ? 'Loading' : state.programme.name,
      href: `${PROGRAMMES}/${state.programme.id}${CLASSES}`,
    },
    { text: 'Classes', href: `${PROGRAMMES}/${state.programme.id}${CLASSES}` },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const alertCallback = getAlertCallback(setState);

  if (state.isLoading) {
    return (
      <PageContainer>
        <PageHeader breadcrumbs={breadcrumbs} />
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

  const handleDelete = (c: ClassListData): void => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to recover the deleted programme.',
      async () => {
        const response = await ApiService.patch(`${PROGRAMMES}/${id}`, {});
        if (response.status === 200) {
          const newClasses = state.programme.classes.slice();
          const index = newClasses.map((c) => c.id).indexOf(c.id);
          newClasses.splice(index, 1);
          setState({ programme: { ...state.programme, classes: newClasses } });
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

  const getMenuOptions = (c: ClassListData): MenuOption[] => {
    return [
      {
        text: 'Edit',
        callback: () => setState({ isEditing: true, selectedClass: c }),
      },
      {
        text: 'Make a copy',
        // eslint-disable-next-line no-console
        callback: () => console.log('TODO: Make a copy'),
      },
      {
        text: 'Delete',
        // eslint-disable-next-line no-console
        callback: () => handleDelete(c),
      },
    ];
  };

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          state.isEditing ? undefined : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={`${PROGRAMMES}/${id}${CLASSES}${CREATE}`}
            >
              Create Class
            </Button>
          )
        }
      />
      {state.isEditing ? (
        <ClassForm
          mode={ClassMode.EDIT}
          questClass={state.selectedClass}
          programme={state.programme}
          alertCallback={alertCallback}
          cancelCallback={() => setState({ isEditing: false })}
        />
      ) : (
        <div style={{ padding: '1rem' }}>
          <Grid container spacing={3}>
            {state.programme.classCount > 0 &&
              state.programme.classes.map((c) => {
                const menuOptions = getMenuOptions(c);
                return (
                  <Grid item xs={12} sm={6} lg={4} key={c.name}>
                    <ClassCard
                      questClass={c}
                      menuOptions={menuOptions}
                      programmeId={state.programme.id}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      )}
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Classes;
