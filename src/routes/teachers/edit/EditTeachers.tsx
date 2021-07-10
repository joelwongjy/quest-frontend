import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import TeacherForm from 'components/teacherForm';
import QuestAlert from 'componentWrappers/questAlert';
import { EDIT, HOME, PERSONS, TEACHERS } from 'constants/routes';
import { PersonData } from 'interfaces/models/persons';
import { TeacherMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

interface EditTeachersState extends RouteState {
  teacher?: PersonData;
}

const EditTeachers: React.FunctionComponent = () => {
  const history = useHistory();
  // const { setHasError } = useError();

  const { id } = useRouteMatch<RouteParams>({
    path: `${TEACHERS}/:id${EDIT}`,
  })!.params;

  const breadcrumbs = [
    { text: 'Home', href: HOME },
    { text: 'Teachers', href: TEACHERS },
    { text: 'Edit', href: `${TEACHERS}/${id}${EDIT}` },
  ];

  const [state, setState] = useReducer(
    (s: EditTeachersState, a: Partial<EditTeachersState>) => ({
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
      teacher: undefined,
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
          setState({ teacher: response.data.person, isLoading: false });
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
      <TeacherForm
        mode={TeacherMode.EDIT}
        teacher={state.teacher}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(TEACHERS)}
        key={`${state.teacher?.id ?? 'fetching-teacher'}`}
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

export default EditTeachers;
