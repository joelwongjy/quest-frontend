/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useState } from 'react';
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
import { useStyles } from './createProgramme.styles';

const CreateStudent: React.FunctionComponent = () => {
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Programmes', href: PROGRAMMES },
    { text: 'Create', href: `${PROGRAMMES}/${CREATE}` },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <ProgrammeForm mode={ProgrammeMode.NEW} name="" />
    </PageContainer>
  );
};

export default CreateStudent;
