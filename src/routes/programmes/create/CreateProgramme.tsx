/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';
import PostIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { CREATE, PROGRAMMES } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import ProgrammeForm from 'components/programmeForm';
import QuestButton from 'componentWrappers/questButton';
import { ProgrammeMode } from 'interfaces/models/programmes';
import { useUser } from 'contexts/UserContext';
import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';
import { useStyles } from './createProgramme.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateProgrammeState extends RouteState {}

const CreateProgramme: React.FunctionComponent = () => {
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Programmes', href: PROGRAMMES },
    { text: 'Create', href: `${PROGRAMMES}/${CREATE}` },
  ];

  const [state, setState] = useReducer(
    (s: CreateProgrammeState, a: Partial<CreateProgrammeState>) => ({
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
      <ProgrammeForm
        mode={ProgrammeMode.NEW}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(PROGRAMMES)}
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

export default CreateProgramme;
