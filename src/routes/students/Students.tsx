import React, { useEffect, useReducer } from 'react';
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CREATE, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { StudentMode } from 'interfaces/models/users';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import IconButton from '@material-ui/core/IconButton';
import QuestAlert from 'componentWrappers/questAlert';
import StudentForm from 'components/studentForm';
import { getAlertCallback } from 'utils/alertUtils';
import { students } from './mockData';

import { useStyles } from './students.styles';

interface StudentsState extends RouteState {
  students: PersonListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedStudent: PersonData | undefined;
}

const Students: React.FunctionComponent = () => {
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

  const alertCallback = getAlertCallback(setState);

  const handleEdit = async (student: PersonListData) => {
    setState({ isLoading: true });
    try {
      const response = await ApiService.get(`persons/${student.id}`);
      if (response.status === 200) {
        setState({
          isEditing: true,
          selectedStudent: response.data as PersonData,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      setState({ isLoading: false, isError: true });
    }
  };

  const handleDelete = (student: PersonListData) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted students.',
      () => {
        // TODO: Send a DELETE request to backend
        const index = state.students.indexOf(student);
        const newStudents = state.students.slice();
        newStudents.splice(index, 1);
        setState({ students: newStudents });
      },
      undefined
    );
  };

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
                        // marginTop: '0.25rem',
                        // marginLeft: '0.25rem',
                      }}
                    />
                    <ListItemText
                      primary={s.name}
                      primaryTypographyProps={{
                        style: { paddingLeft: '1rem', fontSize: 16 },
                      }}
                      // secondary={
                      //   <List dense>
                      //     {s.activities?.map((a) => {
                      //       return (
                      //         <ListItem key={`${a[0].id}-${a[1].id}`}>
                      //           <Typography>{`${a[0].name} - ${a[1].name}`}</Typography>
                      //         </ListItem>
                      //       );
                      //     })}
                      //   </List>
                      // }
                    />
                    <ListItemSecondaryAction>
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
