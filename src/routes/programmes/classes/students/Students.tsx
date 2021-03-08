import React, { useEffect, useReducer } from 'react';
import { Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { PROGRAMMES, CLASSES, ADD, HOME, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ApiService from 'services/apiService';
import { RouteState } from 'interfaces/routes/common';
import { StudentMode } from 'interfaces/models/users';
import { ClassData } from 'interfaces/models/classes';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import QuestAlert from 'componentWrappers/questAlert';
import StudentForm from 'components/studentForm';
import StudentList from 'components/studentList';
import { useUser } from 'contexts/UserContext';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { getAlertCallback } from 'utils/alertUtils';
import { sampleClass } from 'routes/programmes/mockData';

import { useStyles } from './students.styles';

interface StudentsState extends RouteState {
  questClass: ClassData;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedStudent: PersonData | undefined;
}

const Students: React.FunctionComponent = () => {
  const user = useUser();
  const [state, setState] = useReducer(
    (s: StudentsState, a: Partial<StudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      questClass: sampleClass,
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
        const response = await ApiService.get(`classes/${state.questClass.id}`);
        if (!didCancel) {
          setState({
            questClass: response.data as ClassData,
            isLoading: false,
          });
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

  const breadcrumbs = [
    { text: 'Programmes', href: `${PROGRAMMES}` },
    {
      text: state.isLoading ? 'Loading' : state.questClass.programmeName,
      href: `${PROGRAMMES}/${state.questClass.programmeId}${CLASSES}`,
    },
    {
      text: 'Classes',
      href: `${PROGRAMMES}/${state.questClass.programmeId}${CLASSES}`,
    },
    {
      text: state.isLoading ? 'Loading' : state.questClass.name,
      href: `${PROGRAMMES}/${state.questClass.programmeId}${CLASSES}/${state.questClass.id}${STUDENTS}`,
    },
    {
      text: 'Students',
      href: `${PROGRAMMES}/${state.questClass.programmeId}${CLASSES}/${state.questClass.id}${STUDENTS}`,
    },
  ];

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
        const index = state.questClass.students.indexOf(student);
        const newStudents = state.questClass.students.slice();
        newStudents.splice(index, 1);
        setState({
          questClass: { ...state.questClass, students: newStudents },
        });
      },
      undefined
    );
  };

  if (!user || user.highestClassRole === ClassUserRole.STUDENT) {
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
              to={`${PROGRAMMES}/${state.questClass.programmeId}${CLASSES}/${state.questClass.id}${STUDENTS}${ADD}`}
            >
              Add Students
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
        <StudentList
          students={state.questClass.students}
          editCallback={handleEdit}
          deleteCallback={handleDelete}
        />
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
