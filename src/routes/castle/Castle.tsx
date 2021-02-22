import React from 'react';

import { useUser } from 'contexts/UserContext';
import PageContainer from 'components/pageContainer';
import ApiService from 'services/apiService';

import { useStyles } from './castle.styles';

const Castle: React.FunctionComponent = () => {
  const { name } = useUser()!;
  const classes = useStyles();

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>Test</div>
    </PageContainer>
  );
};

export default Castle;
