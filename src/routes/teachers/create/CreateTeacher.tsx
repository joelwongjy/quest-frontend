import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import TeacherForm from 'components/teacherForm';
import QuestAlert from 'componentWrappers/questAlert';
import { CREATE, HOME, TEACHERS } from 'constants/routes';
import { TeacherMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import { getAlertCallback } from 'utils/alertUtils';
// import { useStyles } from './createStudent.styles';

type CreateTeacherState = RouteState;

const CreateTeacher: React.FunctionComponent = () => {
  // const classes = useStyles();
  const history = useHistory();
  // const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Home', href: HOME },
    { text: 'Teachers', href: TEACHERS },
    { text: 'Create', href: `${TEACHERS}/${CREATE}` },
  ];

  const [state, setState] = useReducer(
    (s: CreateTeacherState, a: Partial<CreateTeacherState>) => ({
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
      <TeacherForm
        mode={TeacherMode.NEW}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(TEACHERS)}
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

export default CreateTeacher;
