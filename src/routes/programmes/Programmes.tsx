import React, { useEffect, useReducer } from 'react';

import { QuestComponentProps } from 'interfaces/components/common';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { programmes } from 'routes/questionnaires/mockData';
import { useDispatch } from 'react-redux';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES } from 'constants/routes';
import { Button, Grid } from '@material-ui/core';
import ProgrammeCard from 'components/programmeCard';

import { useStyles } from './programmes.styles';

interface ProgrammesState extends RouteState {
  programmes: ProgrammeListData[];
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
    }
  );

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('questionnaires');
        if (!didCancel) {
          setState({ programmes: response.data, isLoading: false });
          // dispatch(updateSecurities(securitiesResponse.data));
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

  const breadcrumbs = [{ text: 'Programmes', href: PROGRAMMES }];

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Create New
          </Button>
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
    </PageContainer>
  );
};

export default Programme;
