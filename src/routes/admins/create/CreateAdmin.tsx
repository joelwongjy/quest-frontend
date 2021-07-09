import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import AdminForm from 'components/adminForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import { ADMINS, CREATE, HOME } from 'constants/routes';
import { AdminMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import { getAlertCallback } from 'utils/alertUtils';
// import { useStyles } from './createStudent.styles';

type CreateAdminState = RouteState;

const CreateAdmin: React.FunctionComponent = () => {
  // const classes = useStyles();
  const history = useHistory();
  // const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Home', href: HOME },
    { text: 'Admins', href: ADMINS },
    { text: 'Create', href: `${ADMINS}/${CREATE}` },
  ];

  const [state, setState] = useReducer(
    (s: CreateAdminState, a: Partial<CreateAdminState>) => ({
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
    }
  );

  const alertCallback = getAlertCallback(setState);

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <AdminForm
        mode={AdminMode.NEW}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(ADMINS)}
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

export default CreateAdmin;
