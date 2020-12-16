import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import ApiService from 'services/apiService';
import { MenuOption } from 'interfaces/components/programmeCard';
import { RouteState } from 'interfaces/routes/common';
import { ProgrammeListData, ProgrammeMode } from 'interfaces/models/programmes';
import { programmes } from 'routes/questionnaires/mockData';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CREATE, HOME } from 'constants/routes';
import ProgrammeCard from 'components/programmeCard';
import QuestAlert from 'componentWrappers/questAlert';
import ProgrammeForm from 'components/programmeForm';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { useUser } from 'contexts/UserContext';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './programmes.styles';

interface ProgrammesState extends RouteState {
  programmes: ProgrammeListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedProgramme: ProgrammeListData | undefined;
}

const Programme: React.FunctionComponent = () => {
  const user = useUser();
  const [state, setState] = useReducer(
    (s: ProgrammesState, a: Partial<ProgrammesState>) => ({
      ...s,
      ...a,
    }),
    {
      programmes,
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
      selectedProgramme: undefined,
    }
  );

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('programmes');
        if (!didCancel) {
          setState({ programmes: response.data, isLoading: false });
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

  const breadcrumbs = [{ text: 'Programmes', href: PROGRAMMES }];

  const alertCallback = getAlertCallback(setState);

  if (!user || user.role === ClassUserRole.STUDENT) {
    return <Redirect to={HOME} />;
  }

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

  const getMenuOptions = (p: ProgrammeListData): MenuOption[] => {
    return [
      {
        text: 'Edit',
        callback: () => setState({ isEditing: true, selectedProgramme: p }),
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
            Create Programme
          </Button>
        }
      />
      {state.isEditing ? (
        <ProgrammeForm
          mode={ProgrammeMode.EDIT}
          programme={state.selectedProgramme}
          alertCallback={alertCallback}
          cancelCallback={() => setState({ isEditing: false })}
        />
      ) : (
        <div style={{ padding: '1rem' }}>
          <Grid container spacing={6}>
            {state.programmes.length > 0 &&
              state.programmes.map((p) => {
                const menuOptions = getMenuOptions(p);
                return (
                  <Grid item xs={12} sm={6} lg={4} key={p.name}>
                    <ProgrammeCard programme={p} menuOptions={menuOptions} />
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

export default Programme;
