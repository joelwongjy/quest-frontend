import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import ApiService from 'services/apiService';
import { MenuOption } from 'interfaces/components/programmeCard';
import { RouteState, RouteParams } from 'interfaces/routes/common';
import { ClassListData } from 'interfaces/models/classes';
import { questClasses } from 'routes/questionnaires/mockData';
import ClassCard from 'components/classCard';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CREATE, CLASSES } from 'constants/routes';
import QuestAlert from 'componentWrappers/questAlert';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './programmes.styles';

interface ClassesState extends RouteState {
  questClasses: ClassListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedClass: ClassListData | undefined;
}

const Class: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: ClassesState, a: Partial<ClassesState>) => ({
      ...s,
      ...a,
    }),
    {
      questClasses,
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

  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('classes');
        if (!didCancel) {
          setState({ questClasses: response.data, isLoading: false });
          // dispatch(updateSecurities(securitiesResponse.data));
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
  }, [dispatch]);

  const { id } = useParams<RouteParams>();

  const availableClasses = state.questClasses.filter(
    (c) => c.programme.id === parseInt(id, 10)
  );

  const breadcrumbs = [
    { text: 'Programmes', href: PROGRAMMES },
    { text: 'Classes', href: `${PROGRAMMES}/:id${CLASSES}` },
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
        callback: () => console.log('TODO: Delete'),
      },
    ];
  };

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
            to={`${PROGRAMMES}${CREATE}`}
          >
            Create Class
          </Button>
        }
      />
      {state.isEditing ? (
        <div />
      ) : (
        // <ProgrammeForm
        //   mode={ProgrammeMode.EDIT}
        //   programme={state.selectedClass}
        //   alertCallback={alertCallback}
        //   cancelCallback={() => setState({ isEditing: false })}
        // />
        <div>
          <Grid container spacing={3}>
            {availableClasses.length > 0 &&
              availableClasses.map((c) => {
                const menuOptions = getMenuOptions(c);
                return (
                  <Grid item xs={12} sm={6} lg={4} key={c.name}>
                    <ClassCard questClass={c} menuOptions={menuOptions} />
                  </Grid>
                );
              })}
          </Grid>
          <QuestAlert
            isAlertOpen={state.isAlertOpen!}
            hasConfirm={state.hasConfirm}
            alertHeader={state.alertHeader!}
            alertMessage={state.alertMessage!}
            closeHandler={state.closeHandler}
            confirmHandler={state.confirmHandler}
            cancelHandler={state.cancelHandler}
          />
        </div>
      )}
    </PageContainer>
  );
};

export default Class;
