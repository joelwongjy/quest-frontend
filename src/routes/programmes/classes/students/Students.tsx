import React, { useEffect, useReducer } from 'react';
import { Button } from '@material-ui/core';
import { Link, Redirect, useParams } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import {
  PROGRAMMES,
  CLASSES,
  ADD,
  HOME,
  STUDENTS,
  PERSONS,
} from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ApiService from 'services/apiService';
import { ClassRouteParams, RouteState } from 'interfaces/routes/common';
import { StudentMode } from 'interfaces/models/users';
import { ClassData } from 'interfaces/models/classes';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import QuestAlert from 'componentWrappers/questAlert';
import StudentForm from 'components/studentForm';
import StudentList from 'components/studentList';
import { useUser } from 'contexts/UserContext';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { getAlertCallback } from 'utils/alertUtils';
import { ProgrammeData } from 'interfaces/models/programmes';

import { useStyles } from './students.styles';

interface StudentsState extends RouteState {
  programme: ProgrammeData | null;
  questClass: ClassData | null;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  isEditing: boolean;
  selectedStudent: PersonData | undefined;
}

const Students: React.FunctionComponent = () => {
  const user = useUser();
  const { id, classId } = useParams<ClassRouteParams>();
  const [state, setState] = useReducer(
    (s: StudentsState, a: Partial<StudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      programme: null,
      questClass: null,
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
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${PROGRAMMES}/${id}`);
        if (!didCancel) {
          setState({
            programme: response.data as ProgrammeData,
            // questClass: response.data as ClassData,
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
    { text: 'Programmes', href: `${PROGRAMMES}` },
    {
      text:
        state.isLoading || state.programme == null
          ? 'Loading'
          : state.programme.name,
      href: `${PROGRAMMES}/${id}${CLASSES}`,
    },
    {
      text: 'Classes',
      href: `${PROGRAMMES}/${id}${CLASSES}`,
    },
    {
      text:
        state.isLoading || state.questClass == null
          ? 'Loading'
          : state.questClass.name,
      href: `${PROGRAMMES}/${id}${CLASSES}/${classId}${STUDENTS}`,
    },
    {
      text: 'Students',
      href: `${PROGRAMMES}/${id}${CLASSES}/${classId}${STUDENTS}`,
    },
  ];

  const alertCallback = getAlertCallback(setState);

  const handleEdit = async (student: PersonListData) => {
    setState({ isLoading: true });
    try {
      const response = await ApiService.get(`${PERSONS}/${student.id}`);
      if (response.status === 200) {
        setState({
          isEditing: true,
          selectedStudent: response.data.person as PersonData,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      setState({ isLoading: false, isError: true });
    }
  };

  const handleDelete = (student: PersonListData) => {
    const { questClass } = state;
    if (questClass == null) {
      return;
    }

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
        const index = questClass.students.indexOf(student);
        const newStudents = questClass.students.slice();
        newStudents.splice(index, 1);
        setState({
          questClass: { ...questClass, students: newStudents },
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
              to={`${PROGRAMMES}/${id}${CLASSES}/${classId}${STUDENTS}${ADD}`}
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
          students={state.questClass?.students ?? []}
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
