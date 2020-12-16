import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import ApiService from 'services/apiService';
import ClassForm from 'components/classForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { PROGRAMMES, CLASSES, CREATE } from 'constants/routes';
import { ClassMode } from 'interfaces/models/classes';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { RouteParams, RouteState } from 'interfaces/routes/common';
import { programmes } from 'routes/questionnaires/mockData';

interface CreateClassState extends RouteState {
  programme: ProgrammeListData;
}

const CreateClass: React.FunctionComponent = () => {
  const history = useHistory();
  const { id } = useRouteMatch<RouteParams>({
    path: `${PROGRAMMES}/:id${CLASSES}${CREATE}`,
  })!.params;
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
      programme: programmes[0],
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
        const response = await ApiService.get('programme');
        if (!didCancel) {
          setState({ programme: response.data, isLoading: false });
          // dispatch(updateSecurities(securitiesResponse.data));
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

  const alertCallback = (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler?: () => void,
    cancelHandler?: () => void
  ) => {
    setState({
      isAlertOpen,
      hasConfirm,
      alertHeader,
      alertMessage,
    });
    if (confirmHandler) {
      setState({
        confirmHandler: () => {
          confirmHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ confirmHandler: () => setState({ isAlertOpen: false }) });
    }
    if (cancelHandler) {
      setState({
        cancelHandler: () => {
          cancelHandler();
          setState({ isAlertOpen: false });
        },
      });
    } else {
      setState({ cancelHandler: () => setState({ isAlertOpen: false }) });
    }
  };

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
    </PageContainer>
  );
};

export default CreateClass;
