import React, { useEffect, useReducer } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { QuestComponentProps } from 'interfaces/components/common';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { programmes } from 'routes/questionnaires/mockData';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES } from 'constants/routes';
import ProgrammeCard from 'components/programmeCard';
import QuestButton from 'componentWrappers/questButton';

import QuestAlert from 'componentWrappers/questAlert';
import { useStyles } from './programmes.styles';

interface ProgrammesState extends RouteState {
  programmes: ProgrammeListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
}

const Programme: React.FC<QuestComponentProps> = () => {
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

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          <QuestButton
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Create New
          </QuestButton>
        }
      />
      <Grid container spacing={3}>
        {state.programmes.map((p) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={p.name}>
              <ProgrammeCard programme={p} />
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
