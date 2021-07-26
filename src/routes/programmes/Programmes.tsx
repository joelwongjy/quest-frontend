import React, { useEffect, useReducer } from 'react';
import { Grid } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import ProgrammeCard from 'components/programmeCard';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import QuestAlert from 'componentWrappers/questAlert';
import { HOME, PROGRAMMES } from 'constants/routes';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { sortByName } from 'utils/sortingUtils';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${PROGRAMMES}`);
        const programmes = response.data.programmes as ProgrammeListData[];
        setState({ programmes, isLoading: false });
      } catch (error) {
        setState({
          isError: true,
          isLoading: false,
          isAlertOpen: true,
          hasConfirm: false,
          alertHeader: 'Something went wrong',
          alertMessage: 'Please refresh the page and try again',
        });
      }
    };

    if (!state.isEditing) {
      fetchData();
    }
  }, [state.isEditing]);

  const breadcrumbs = [
    { text: 'Home', href: HOME },
    { text: 'Programmes', href: `${PROGRAMMES}` },
  ];

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

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div style={{ padding: '1rem' }}>
        <Grid container spacing={6}>
          {state.programmes.length > 0 &&
            state.programmes
              .slice()
              .sort(sortByName)
              .map((p) => {
                return (
                  <Grid item xs={12} sm={6} lg={4} key={p.name}>
                    <ProgrammeCard programme={p} />
                  </Grid>
                );
              })}
        </Grid>
      </div>
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
