/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography } from '@material-ui/core';
import PostIcon from '@material-ui/icons/Description';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import ProgrammeForm from 'components/programmeForm';
import QuestAlert from 'componentWrappers/questAlert';
import { CREATE, HOME, PROGRAMMES } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import { ProgrammeMode } from 'interfaces/components/programmeForm';
import { RouteState } from 'interfaces/routes/common';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './createProgramme.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateProgrammeState extends RouteState {}

const CreateProgramme: React.FunctionComponent = () => {
  const { user } = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Home', href: HOME },
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

  const alertCallback = getAlertCallback(setState);

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
