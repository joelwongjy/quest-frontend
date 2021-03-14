import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ApiService from 'services/apiService';
import ClassStudentForm from 'components/classStudentForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CLASSES, STUDENTS } from 'constants/routes';
import { ClassData } from 'interfaces/models/classes';
import { PersonListData } from 'interfaces/models/persons';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';
import { sampleClass } from 'routes/programmes/mockData';
import { getAlertCallback } from 'utils/alertUtils';

interface AddStudentsState extends RouteState {
  questClass: ClassData;
  students: PersonListData[];
}

const AddStudents: React.FunctionComponent = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const programmeId = parseInt(id, 10);

  const [state, setState] = useReducer(
    (s: AddStudentsState, a: Partial<AddStudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      questClass: sampleClass,
      students: [],
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

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const responseOne = await ApiService.get(`${STUDENTS}`);
        // TODO: To add class fetching with responseTwo
        if (!didCancel) {
          setState({
            // questClass: responseTwo.data as ClassData,
            students: responseOne.data.persons as PersonListData[],
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
      text: state.isLoading ? 'Loading' : state.questClass.programmeName,
      href: `${PROGRAMMES}/${programmeId}${CLASSES}`,
    },
    { text: 'Classes', href: `${PROGRAMMES}/${programmeId}${CLASSES}` },
    {
      text: state.isLoading ? 'Loading' : state.questClass.name,
      href: `${PROGRAMMES}/${programmeId}${CLASSES}/${state.questClass.id}${STUDENTS}`,
    },
    {
      text: 'Students',
      href: `${PROGRAMMES}/${programmeId}${CLASSES}/${state.questClass.id}${STUDENTS}`,
    },
    {
      text: 'Add',
    },
  ];

  const alertCallback = getAlertCallback(setState);

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <ClassStudentForm
        questClass={state.questClass}
        students={state.students}
        alertCallback={alertCallback}
        cancelCallback={() =>
          history.push(
            `${PROGRAMMES}/${programmeId}${CLASSES}/${state.questClass.id}${STUDENTS}`
          )
        }
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

export default AddStudents;
