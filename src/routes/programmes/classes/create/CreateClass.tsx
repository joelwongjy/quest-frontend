import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ApiService from 'services/apiService';
import ClassForm from 'components/classForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CLASSES, CREATE } from 'constants/routes';
import { ClassMode } from 'interfaces/components/classForm';
import { ProgrammeData } from 'interfaces/models/programmes';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';
import { sampleProgramme } from 'routes/programmes/mockData';
import { getAlertCallback } from 'utils/alertUtils';

interface CreateClassState extends RouteState {
  programme: ProgrammeData;
}

const CreateClass: React.FunctionComponent = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const programmeId = parseInt(id, 10);

  const breadcrumbs = [
    { text: 'Programmes', href: PROGRAMMES },
    { text: 'Classes', href: `${PROGRAMMES}/${programmeId}${CLASSES}` },
    {
      text: 'Create',
      href: `${PROGRAMMES}/${programmeId}${CLASSES}/${CREATE}`,
    },
  ];

  const [state, setState] = useReducer(
    (s: CreateClassState, a: Partial<CreateClassState>) => ({
      ...s,
      ...a,
    }),
    {
      programme: sampleProgramme,
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

  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        // To be replaced with `programmes/${id}/students`
        const response = await ApiService.get(`programmes/${id}`);
        if (!didCancel) {
          setState({
            programme: response.data as ProgrammeData,
            isLoading: false,
          });
          // do dispatch here if necessary
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

  const alertCallback = getAlertCallback(setState);

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <ClassForm
        mode={ClassMode.NEW}
        programme={state.programme}
        alertCallback={alertCallback}
        cancelCallback={() =>
          history.push(`${PROGRAMMES}/${state.programme.id}${CLASSES}`)
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

export default CreateClass;
