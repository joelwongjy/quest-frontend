import React, { useEffect, useReducer } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';

import { Student } from 'interfaces/models/students';
import { students } from './mockData';

import { useStyles } from './students.styles';

interface StudentsState extends RouteState {
  students: Student[];
}

const Students: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: StudentsState, a: Partial<StudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      students,
      isLoading: true,
      isError: false,
    }
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('students');
        if (!didCancel) {
          setState({ students: response.data, isLoading: false });
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

  const breadcrumbs = [{ text: 'Students', href: STUDENTS }];

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
            to={`${STUDENTS}${CREATE}`}
          >
            Create New
          </Button>
        }
      />
      <Grid container spacing={3}>
        {state.students.map((s) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={s.name}>
              <Card>
                <CardContent>
                  <Typography
                    className={classes.title}
                    variant="h5"
                    component="h2"
                    noWrap
                  >
                    {s.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
};

export default Students;
