import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import { CREATE, EDIT, STUDENTS } from 'constants/routes';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './teachers.styles';

interface TeachersState extends RouteState {
  students: PersonListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  selectedStudent: PersonData | undefined;
}

const Teachers: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: TeachersState, a: Partial<TeachersState>) => ({
      ...s,
      ...a,
    }),
    {
      students: [],
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
      selectedStudent: undefined,
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${STUDENTS}`);
        if (!didCancel) {
          setState({ students: response.data.persons, isLoading: false });
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

  const breadcrumbs = [{ text: 'Teachers', href: STUDENTS }];

  const alertCallback = getAlertCallback(setState);

  const handleEdit = async (student: PersonListData) => {
    history.push(`${STUDENTS}/${student.id}${EDIT}`);
  };

  const handleDelete = (student: PersonListData) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted students.',
      () => {
        // TODO: Add error handling to deletion
        ApiService.delete(`${STUDENTS}`, {
          data: {
            persons: [student.id],
          },
        });
        const index = state.students.indexOf(student);
        const newTeachers = state.students.slice();
        newTeachers.splice(index, 1);
        setState({ students: newTeachers });
      },
      undefined
    );
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
            to={`${STUDENTS}${CREATE}`}
          >
            Create Teacher
          </Button>
        }
      />
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

export default Teachers;
