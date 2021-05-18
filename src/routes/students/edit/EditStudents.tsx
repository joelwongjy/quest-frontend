import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import StudentForm from 'components/studentForm';
import QuestAlert from 'componentWrappers/questAlert';
import { EDIT, PERSONS, STUDENTS } from 'constants/routes';
import { PersonData } from 'interfaces/models/persons';
import { StudentMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';
// import { useStyles } from './createStudent.styles';

interface EditStudentsState extends RouteState {
  student?: PersonData;
}

const EditStudents: React.FunctionComponent = () => {
  // const classes = useStyles();
  const history = useHistory();
  // const { setHasError } = useError();

  const { id } = useRouteMatch<RouteParams>({
    path: `${STUDENTS}/:id${EDIT}`,
  })!.params;

  const breadcrumbs = [
    { text: 'Students', href: STUDENTS },
    { text: 'Edit', href: `${STUDENTS}/${id}${EDIT}` },
  ];

  const [state, setState] = useReducer(
    (s: EditStudentsState, a: Partial<EditStudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
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
      student: undefined,
    }
  );

  const dispatch = useDispatch();
  const alertCallback = getAlertCallback(setState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setState({ isLoading: true });
      try {
        const response = await ApiService.get(`${PERSONS}/${id}`);

        if (!didCancel) {
          setState({ student: response.data.person, isLoading: false });
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

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <StudentForm
        mode={StudentMode.EDIT}
        student={state.student}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(STUDENTS)}
        key={`${state.student?.id ?? 'fetching-student'}`}
      />
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default EditStudents;
