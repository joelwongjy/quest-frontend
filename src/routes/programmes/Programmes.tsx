import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import ApiService from 'services/apiService';
import { MenuOption } from 'interfaces/components/programmeCard';
import { RouteState } from 'interfaces/routes/common';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { ProgrammeMode } from 'interfaces/components/programmeForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CREATE } from 'constants/routes';
import ProgrammeCard from 'components/programmeCard';
import QuestAlert from 'componentWrappers/questAlert';
import ProgrammeForm from 'components/programmeForm';
import { getAlertCallback } from 'utils/alertUtils';
import { sortByName } from 'utils/sortingUtils';
import AuthService from 'services/authService';

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
  const [state, setState] = useReducer(
    (s: ProgrammesState, a: Partial<ProgrammesState>) => ({
      ...s,
      ...a,
    }),
    {
      programmes: [],
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
        const response = await ApiService.get(`${PROGRAMMES}`);
        const programmes = response.data.programmes as ProgrammeListData[];
        if (!didCancel) {
          setState({ programmes, isLoading: false });
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

  const breadcrumbs = [{ text: 'Programmes', href: `${PROGRAMMES}` }];

  const alertCallback = getAlertCallback(setState);

  if (state.isLoading) {
    return (
      <PageContainer isLoggedIn>
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

  const handleDelete = (p: ProgrammeListData): void => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to recover the deleted programme.',
      async () => {
        const response = await ApiService.delete(`${PROGRAMMES}/${p.id}`);
        if (response.status === 200) {
          const newProgrammes = state.programmes.slice();
          const index = newProgrammes.map((p) => p.id).indexOf(p.id);
          newProgrammes.splice(index, 1);
          setState({ programmes: newProgrammes });
          await AuthService.getUser();
        } else {
          // TODO: Handle error
        }
      },
      undefined
    );
  };

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
        callback: () => handleDelete(p),
      },
    ];
  };

  return (
    <PageContainer isLoggedIn>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          state.isEditing ? undefined : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={`${PROGRAMMES}${CREATE}`}
            >
              Create Programme
            </Button>
          )
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
              state.programmes
                .slice()
                .sort(sortByName)
                .map((p) => {
                  const menuOptions = getMenuOptions(p);
                  return (
                    <Grid item xs={12} sm={6} lg={4} key={p.name}>
                      <ProgrammeCard programme={p} menuOptions={menuOptions} />
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

export default Programme;
