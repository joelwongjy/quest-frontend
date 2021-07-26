import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import ClassCard from 'components/classCard';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestionnaireCardGhost from 'components/questionnaireCard/QuestionnaireCardGhost';
import QuestAlert from 'componentWrappers/questAlert';
import { CLASSES, CREATE, HOME, PROGRAMMES } from 'constants/routes';
import { ClassListData } from 'interfaces/models/classes';
import { ProgrammeData } from 'interfaces/models/programmes';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { sortByName } from 'utils/sortingUtils';

import { useStyles } from './classes.styles';

interface ClassesState extends RouteState {
  programme: ProgrammeData | null;
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
      programme: null,
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
    { text: 'Home', href: HOME },
    { text: 'Programmes', href: `${PROGRAMMES}` },
    {
      text:
        state.isLoading || state.programme == null
          ? 'Loading'
          : state.programme.name,
      href: `${PROGRAMMES}/${id}${CLASSES}`,
    },
    { text: 'Classes', href: `${PROGRAMMES}/${id}${CLASSES}` },
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

  if (state.programme === null) {
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
              to={`${PROGRAMMES}/${id}${CLASSES}${CREATE}`}
              disabled
            >
              Create Class
            </Button>
          }
        />
        Loading...
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <div style={{ padding: '1rem' }}>
        <Grid container spacing={3}>
          {(state.programme?.classCount ?? 0) > 0 &&
            state.programme?.classes
              .slice()
              .sort(sortByName)
              .map((c) => {
                return (
                  <Grid item xs={12} sm={6} lg={4} key={c.name}>
                    <ClassCard
                      questClass={c}
                      programmeId={state.programme!.id}
                    />
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

export default Classes;
