import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { CREATE, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import StudentForm from 'components/studentForm';
import { StudentMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';
import { getAlertCallback } from 'utils/alertUtils';
// import { useStyles } from './createStudent.styles';

type CreateStudentState = RouteState;

const CreateStudent: React.FunctionComponent = () => {
  // const classes = useStyles();
  const history = useHistory();
  // const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Students', href: STUDENTS },
    { text: 'Create', href: `${STUDENTS}/${CREATE}` },
  ];

  const [state, setState] = useReducer(
    (s: CreateStudentState, a: Partial<CreateStudentState>) => ({
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
      <StudentForm
        mode={StudentMode.NEW}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(STUDENTS)}
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

export default CreateStudent;
