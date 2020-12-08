/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import SingleIcon from '@material-ui/icons/DescriptionOutlined';
import PostIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { CREATE, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import StudentForm from 'components/studentForm';
import QuestButton from 'componentWrappers/questButton';
import { StudentMode } from 'interfaces/models/students';
import { useUser } from 'contexts/UserContext';
import { useError } from 'contexts/ErrorContext';
import { useStyles } from './createStudent.styles';

const CreateStudent: React.FunctionComponent = () => {
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();
  const { setHasError } = useError();

  const breadcrumbs = [
    { text: 'Students', href: STUDENTS },
    { text: 'Create', href: `${STUDENTS}/${CREATE}` },
  ];

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <StudentForm mode={StudentMode.NEW} name="" />
    </PageContainer>
  );
};

export default CreateStudent;
