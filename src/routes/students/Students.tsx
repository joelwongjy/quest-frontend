import React, { useEffect, useReducer } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, HOME, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { Student, StudentMode } from 'interfaces/models/students';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import QuestAlert from 'componentWrappers/questAlert';
import StudentForm from 'components/studentForm';
import { useUser } from 'contexts/UserContext';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { students } from './mockData';
import { useStyles } from './students.styles';

interface StudentsState extends RouteState {
  students: Student[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedStudent: Student | undefined;
}

const Students: React.FunctionComponent = () => {
  const user = useUser();
  const [state, setState] = useReducer(
    (s: StudentsState, a: Partial<StudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      students: students.slice(),
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
      selectedStudent: undefined,
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

  const breadcrumbs = [{ text: 'Students', href: STUDENTS }];

  const alertCallback = (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler?: () => void,
    cancelHandler?: () => void
  ) => {
    setState({
      isAlertOpen,
      hasConfirm,
      alertHeader,
      alertMessage,
    });
    if (confirmHandler) {
      setState({
        confirmHandler: () => {
          confirmHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ confirmHandler: () => setState({ isAlertOpen: false }) });
    }
    if (cancelHandler) {
      setState({
        cancelHandler: () => {
          cancelHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ cancelHandler: () => setState({ isAlertOpen: false }) });
    }
  };

  const handleEdit = (student: Student) => {
    setState({ isEditing: true, selectedStudent: student });
  };

  const handleDelete = (student: Student) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted students.',
      () => {
        const index = state.students.indexOf(student);
        const newStudents = state.students.slice();
        newStudents.splice(index, 1);
        setState({ students: newStudents });
      },
      undefined
    );
  };

  if (!user || user.role === ClassUserRole.STUDENT) {
    return <Redirect to={HOME} />;
  }

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          state.isEditing ? undefined : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={`${STUDENTS}${CREATE}`}
            >
              Create Student
            </Button>
          )
        }
      />
      {state.isEditing ? (
        <StudentForm
          mode={StudentMode.EDIT}
          student={state.selectedStudent}
          alertCallback={alertCallback}
          cancelCallback={() => setState({ isEditing: false })}
        />
      ) : (
        <div className={classes.paperContainer}>
          <Paper
            className={classes.paper}
            elevation={0}
            style={{ background: 'white' }}
          >
            <List className={classes.list}>
              {state.students.map((s) => {
                return (
                  <ListItem key={s.name} className={classes.item}>
                    <EmojiPeopleIcon
                      style={{
                        fontSize: 28,
                        marginTop: '0.25rem',
                        marginLeft: '0.25rem',
                      }}
                    />
                    <ListItemText
                      primary={s.name}
                      primaryTypographyProps={{
                        style: { paddingLeft: '1rem', fontSize: 16 },
                      }}
                      secondary={
                        <List dense>
                          {s.activities?.map((a) => {
                            return (
                              <ListItem key={`${a[0].id}-${a[1].id}`}>
                                <Typography>{`${a[0].name} - ${a[1].name}`}</Typography>
                              </ListItem>
                            );
                          })}
                        </List>
                      }
                    />
                    <ListItemSecondaryAction style={{ top: '20%' }}>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(s)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(s)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
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

export default Students;
