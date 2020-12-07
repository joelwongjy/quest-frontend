import React, { useEffect, useReducer } from 'react';
import { Button, CardContent, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { Student } from 'interfaces/models/students';
import QuestCard from 'componentWrappers/questCard';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
            Create Student
          </Button>
        }
      />
      <List dense={false}>
        {state.students.map((s) => {
          return (
            <ListItem key={s.name}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={s.name} secondary="Program 1 - Class 1" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </PageContainer>
  );
};

export default Students;
