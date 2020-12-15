/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';
import PostIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';

import ApiService from 'services/apiService';
import ClassForm from 'components/classForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import ProgrammeForm from 'components/programmeForm';
import QuestAlert from 'componentWrappers/questAlert';
import QuestButton from 'componentWrappers/questButton';
import { PROGRAMMES, CLASSES, CREATE } from 'constants/routes';
import { ClassMode } from 'interfaces/models/classes';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { useUser } from 'contexts/UserContext';
import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import { programmes } from 'routes/questionnaires/mockData';

import { useStyles } from './createClass.styles';

interface CreateClassState extends RouteState {
  programme: ProgrammeListData;
}

const CreateClass: React.FunctionComponent = () => {
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Programmes', href: PROGRAMMES },
    { text: 'Classes', href: `${PROGRAMMES}/:id${CLASSES}` },
    { text: 'Create', href: `${PROGRAMMES}/:id${CLASSES}/${CREATE}` },
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
