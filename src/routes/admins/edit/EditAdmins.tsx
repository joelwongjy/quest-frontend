import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import AdminForm from 'components/adminForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import { ADMINS, EDIT, PERSONS } from 'constants/routes';
import { PersonData } from 'interfaces/models/persons';
import { AdminMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

interface EditAdminsState extends RouteState {
  admin?: PersonData;
}

const EditAdmins: React.FunctionComponent = () => {
  const history = useHistory();
  // const { setHasError } = useError();

  const { id } = useRouteMatch<RouteParams>({
    path: `${ADMINS}/:id${EDIT}`,
  })!.params;

  const breadcrumbs = [
    { text: 'Admins', href: ADMINS },
    { text: 'Edit', href: `${ADMINS}/${id}${EDIT}` },
  ];

  const [state, setState] = useReducer(
    (s: EditAdminsState, a: Partial<EditAdminsState>) => ({
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
      admin: undefined,
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
          setState({ admin: response.data.person, isLoading: false });
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
      <AdminForm
        mode={AdminMode.EDIT}
        admin={state.admin}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(ADMINS)}
        key={`${state.admin?.id ?? 'fetching-admin'}`}
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

export default EditAdmins;
