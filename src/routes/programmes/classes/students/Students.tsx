import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import StudentList from 'components/studentList';
import QuestAlert from 'componentWrappers/questAlert';
import { CLASSES, HOME, PROGRAMMES, STUDENTS } from 'constants/routes';
import { ClassData } from 'interfaces/models/classes';
import { ClassRouteParams, RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';

interface StudentsState extends RouteState {
  questClass: ClassData | null;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
}

const Students: React.FunctionComponent = () => {
  const { id, classId } = useParams<ClassRouteParams>();
  const [state, setState] = useReducer(
    (s: StudentsState, a: Partial<StudentsState>) => ({
      ...s,
      ...a,
    }),
    {
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
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${CLASSES}/${classId}`);
        if (!didCancel) {
          setState({
            questClass: response.data as ClassData,
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
    { text: 'Home', href: HOME },
    { text: 'Programmes', href: `${PROGRAMMES}` },
    {
      text:
        state.isLoading || state.questClass == null
          ? 'Loading'
          : state.questClass.programmeName,
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

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <StudentList students={state.questClass?.students ?? []} />
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
