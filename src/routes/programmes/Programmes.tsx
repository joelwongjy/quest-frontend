import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import ApiService from 'services/apiService';
import { MenuOption } from 'interfaces/components/programmeCard';
import { RouteState } from 'interfaces/routes/common';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { programmes } from 'routes/questionnaires/mockData';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CREATE } from 'constants/routes';
import ProgrammeCard from 'components/programmeCard';

import QuestAlert from 'componentWrappers/questAlert';
import { useStyles } from './programmes.styles';

interface ProgrammesState extends RouteState {
  programmes: ProgrammeListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
}

const Programme: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: ProgrammesState, a: Partial<ProgrammesState>) => ({
      ...s,
      ...a,
    }),
    {
      programmes,
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

  const getMenuOptions = (): MenuOption[] => {
    return [
      {
        text: 'Edit',
        // eslint-disable-next-line no-console
        callback: () => console.log('TODO: Edit'),
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
            Create New
          </Button>
        }
      />
      <Grid container spacing={3}>
        {state.programmes.length > 0 &&
          state.programmes.map((p) => {
            const menuOptions = getMenuOptions();
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
    </PageContainer>
  );
};

export default Programme;
